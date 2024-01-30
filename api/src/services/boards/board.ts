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
  const cells: { letter?: string; status: BoardCellStatus }[] = wordle(
    guess,
    solution
  ).map((statuses, index) => {
    if (hideLetters) {
      return { status: statuses }
    }
    return { letter: guess[index], status: statuses }
  })

  return { cells }
}

const wordle = (guess: string, solution: string): BoardCellStatus[] => {
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: BoardCellStatus[] = Array.from(Array(guess.length))

  // Correct Cases
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'CORRECT'
      solutionCharsTaken[i] = true
      return
    }
  })

  // Absent Cases
  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      statuses[i] = 'INCORRECT'
      return
    }

    // Present Cases
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'MISPLACED'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'INCORRECT'
      return
    }
  })

  return statuses
}
