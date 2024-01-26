import { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

import { buildBoard } from './board'

export const dailyLeaderboard: QueryResolvers['dailyLeaderboard'] = async ({
  date,
}) => {
  const [guesses, { word: solution }] = await Promise.all([
    db.guess.findMany({
      where: {
        solution: { date },
      },
      select: {
        id: true,
        word: true,
        nthGuess: true,
        correctCount: true,
        misplacedCount: true,
        incorrectCount: true,
        user: true,
        solutionId: true,
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

  const filteredGuesses = guesses.filter((guess) => {
    const otherGuesses = guesses.filter(
      (g) => g.solutionId === guess.solutionId
    )
    const hasFiveCorrectLetters = otherGuesses.some((g) => g.correctCount === 5)
    return hasFiveCorrectLetters
  })

  const groupedByUser = filteredGuesses.reduce((acc, guess) => {
    const userId = guess.user.id
    if (acc[userId]) {
      acc[userId].push(guess)
    } else {
      acc[userId] = [guess]
    }
    return acc
  }, {} as Record<string, typeof filteredGuesses>)

  const results = Object.values(groupedByUser).map((guesses) => ({
    board: buildBoard(date, solution, guesses, true),
    user: guesses[0].user,
  }))

  return results
    .map((result) => {
      const newRows = result.board.rows.filter((row) =>
        row.cells.some((cell) => cell.status !== 'EMPTY')
      )
      const newBoard = {
        ...result.board,
        rows: newRows,
      }
      return {
        board: newBoard,
        user: result.user,
      }
    })
    .sort((a, b) => {
      const aLen = a.board.rows.length
      const bLen = b.board.rows.length
      return aLen - bLen
    })
}
