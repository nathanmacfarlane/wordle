import { startOfDay } from 'date-fns'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const guesses: QueryResolvers['guesses'] = async (input) => {
  const date = startOfDay(input.date || new Date())
  const { id: userId } = getAuthedUser()

  const guesses = await db.guess.findMany({
    where: {
      userId,
      solution: { date },
    },
    select: {
      id: true,
      word: true,
      nthGuess: true,
      correctCount: true,
      misplacedCount: true,
      incorrectCount: true,
    },
  })

  return guesses
}

export const createGuess: MutationResolvers['createGuess'] = async ({
  input,
}) => {
  const date = startOfDay(new Date())
  const { id: userId } = getAuthedUser()

  const [existingGuesses, solution] = await Promise.all([
    db.guess.count({
      where: { userId, solution: { date } },
    }),
    db.solution.findFirstOrThrow({
      where: { date },
      select: { word: true, id: true },
    }),
  ])

  const stats = input.word.split('').reduce(
    (acc, letter, index) => {
      const isCorrect = letter === solution.word[index]
      const isMisplaced = !isCorrect && solution.word.includes(letter)
      const isIncorrect = !isCorrect && !isMisplaced

      return {
        correctCount: acc.correctCount + (isCorrect ? 1 : 0),
        misplacedCount: acc.misplacedCount + (isMisplaced ? 1 : 0),
        incorrectCount: acc.incorrectCount + (isIncorrect ? 1 : 0),
      }
    },
    { correctCount: 0, misplacedCount: 0, incorrectCount: 0 }
  )

  const nthGuess = existingGuesses + 1

  return db.guess.create({
    data: {
      solution: { connect: { id: solution.id } },
      user: { connect: { id: userId } },
      word: input.word,
      nthGuess,
      ...stats,
    },
  })
}
