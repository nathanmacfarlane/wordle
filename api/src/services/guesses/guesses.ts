import { startOfDay } from 'date-fns'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
// import { VALID_WORDS } from 'src/lib/validWords'
import { getCurrentDateForUser } from 'src/utils/generateUserDate'

export const guesses: QueryResolvers['guesses'] = async (input) => {
  const { id: userId } = getAuthedUser()

  const date = input.date
    ? startOfDay(input.date)
    : await getCurrentDateForUser(userId)

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

export const todaysAverageScore: QueryResolvers['todaysAverageScore'] =
  async () => {
    const { id: userId } = getAuthedUser()
    const date = await getCurrentDateForUser(userId)

    const userNthGuesses = await db.guess.aggregate({
      where: {
        solution: { date },
        correctCount: 5,
      },
      _avg: { nthGuess: true },
    })

    if (!userNthGuesses._avg.nthGuess) {
      return null
    }

    return userNthGuesses._avg.nthGuess
  }

export const createGuess: MutationResolvers['createGuess'] = async ({
  input,
}) => {
  const { id: userId } = getAuthedUser()
  const date = await getCurrentDateForUser(userId)

  // if (VALID_WORDS.indexOf(input.word) === -1) {
  //   throw new Error('Invalid word')
  // }

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
