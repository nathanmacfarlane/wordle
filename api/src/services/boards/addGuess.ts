import { MutationResolvers } from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { VALID_WORDS } from 'src/lib/validWords'

import { buildBoard } from './board'

export const addGuess: MutationResolvers['addGuess'] = async ({
  date,
  word,
}) => {
  const { id: userId } = getAuthedUser()

  const [guesses, solution] = await Promise.all([
    db.guess.findMany({
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
    }),
    db.solution.findFirstOrThrow({
      where: {
        date,
      },
    }),
  ])

  const existingBoard = buildBoard(date, solution.word, guesses)

  if (!VALID_WORDS.includes(word)) {
    return { board: existingBoard, error: `${word} is not a valid word` }
  }

  if (guesses.length === 6) {
    return { board: existingBoard, error: 'You have already made 6 guesses' }
  }

  if (
    guesses.length > 0 &&
    guesses[guesses.length - 1].word === solution.word
  ) {
    return {
      board: existingBoard,
      error: 'You have already guessed the solution',
    }
  }

  const stats = word.split('').reduce(
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

  const nthGuess = guesses.length + 1

  try {
    const newGuess = await db.guess.create({
      data: {
        solution: { connect: { id: solution.id } },
        user: { connect: { id: userId } },
        word,
        nthGuess,
        ...stats,
      },
    })

    return {
      board: buildBoard(date, solution.word, [...guesses, newGuess]),
    }
  } catch (error) {
    return { board: existingBoard, error: (error as Error).message }
  }
}
