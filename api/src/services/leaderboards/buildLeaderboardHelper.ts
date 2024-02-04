import { endOfMonth, startOfMonth } from 'date-fns'
import { User } from 'types/graphql'

import { db } from 'src/lib/db'

export const buildLeaderboard = async (_date: string | Date) => {
  const som = startOfMonth(_date)
  const eom = endOfMonth(_date)

  const scores = await db.guess.findMany({
    where: {
      user: { email: { startsWith: 'user_' } },
      solution: {
        date: { gte: som, lte: eom },
      },
    },
    include: { user: true },
  })

  const filteredScores = scores.filter((guess) => {
    const otherGuesses = scores.filter(
      (g) => g.solutionId === guess.solutionId && guess.userId === g.userId
    )
    const hasFiveCorrectLetters = otherGuesses.some((g) => g.correctCount === 5)
    return hasFiveCorrectLetters
  })

  const scoresByUser = filteredScores.reduce((acc, score) => {
    const existingScore = acc.find((s) => s.user.id === score.userId)
    if (existingScore) {
      existingScore.score += 1
      existingScore.solutions = [
        ...new Set([...existingScore.solutions, score.solutionId]),
      ]
    } else {
      acc.push({ user: score.user, score: 1, solutions: [score.solutionId] })
    }
    return acc
  }, [] as { user: User; score: number; solutions: number[] }[])

  const sortedScores = scoresByUser
    .map((s) => ({
      user: s.user,
      score: s.score,
      activeDays: s.solutions.length,
      averageScore: s.score / s.solutions.length,
    }))
    .sort((a, b) => a.averageScore - b.averageScore)

  return sortedScores
}
