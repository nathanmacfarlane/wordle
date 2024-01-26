import {
  Board,
  BoardCellStatus,
  BoardRow,
  Guess,
  QueryResolvers,
} from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { padEnd } from 'src/utils/array'

export const board: QueryResolvers['board'] = async ({ date }) => {
  const { id: userId } = getAuthedUser()

  const [guesses, { word: solution }] = await Promise.all([
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
      select: {
        word: true,
      },
    }),
  ])

  return buildBoard(date, solution, guesses)
}

export const buildBoard = (
  date: NonNullable<string | Date>,
  solution: string,
  guesses: Guess[],
  hideLetters = false
): Board => {
  const rows = guesses.map(({ word: guess }) =>
    getRowData(solution, guess, hideLetters)
  )

  const paddedRows = padEnd(rows, 6, {
    cells: [
      { status: 'EMPTY' },
      { status: 'EMPTY' },
      { status: 'EMPTY' },
      { status: 'EMPTY' },
      { status: 'EMPTY' },
    ],
  } as BoardRow)

  const isComplete =
    guesses.length === 6 ||
    (guesses.length > 0 && guesses[guesses.length - 1].word === solution)

  const correctLetters = guesses
    .map((guess) =>
      guess.word.split('').filter((letter, index) => {
        return letter === solution[index]
      })
    )
    .flat()

  const incorrectLetters = guesses
    .map((guess) =>
      guess.word.split('').filter((letter) => {
        return !solution.includes(letter)
      })
    )
    .flat()

  const misplacedLetters = guesses
    .map((guess) =>
      guess.word.split('').filter((letter, index) => {
        return (
          letter !== solution[index] &&
          !correctLetters.includes(letter) &&
          solution.includes(letter)
        )
      })
    )
    .flat()

  return {
    date,
    rows: paddedRows,
    isComplete,
    keyboard: {
      correctLetters,
      incorrectLetters,
      misplacedLetters,
    },
  }
}

const getRowData = (
  solution: string,
  guess?: string,
  hideLetters?: boolean
): BoardRow => {
  const cells = gatherCells(solution, guess || '', hideLetters)

  return cells
}

const gatherCells = (
  solution: string,
  guess: string,
  hideLetters?: boolean
): BoardRow => {
  const cells: { letter: string; status: BoardCellStatus }[] = []

  // Check for correct letters at correct positions
  for (let i = 0; i < solution.length; i++) {
    if (solution[i] === guess[i]) {
      cells.push({ letter: guess[i], status: 'CORRECT' })
    } else {
      cells.push({ letter: guess[i], status: 'INCORRECT' })
    }
  }

  // Check for correct letters at incorrect positions
  for (let i = 0; i < solution.length; i++) {
    // the guess letter in this position exists elsewhere in the solution
    if (solution[i] !== guess[i] && solution.includes(guess[i])) {
      // find all other indexes of this letter
      const otherIndexes = solution.split('').reduce((acc, letter, index) => {
        if (letter === guess[i]) {
          acc.push(index)
        }
        return acc
      }, [] as number[])
      // if some letter exists in the solution and does not match
      // the guess letter in that position, it is misplaced
      const isMisplaced = otherIndexes.some(
        (index) => solution[index] !== guess[index]
      )
      if (isMisplaced) {
        cells[i] = { letter: guess[i], status: 'MISPLACED' }
      }
    }
  }

  const mutatedCells = hideLetters
    ? cells.map(({ status }) => ({ status }))
    : cells

  return { cells: mutatedCells }
}
