import type { QueryResolvers } from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const totalWordles: QueryResolvers['totalWordles'] = async () => {
  const { id: userId } = getAuthedUser()

  const allWordles = await db.guess.groupBy({
    by: ['solutionId'],
    where: { userId },
  })

  return allWordles.length
}

export const winPercentage: QueryResolvers['winPercentage'] = async () => {
  const { id: userId } = getAuthedUser()

  const allWordles = await db.guess.groupBy({
    by: ['solutionId'],
    where: { userId },
  })

  if (allWordles.length === 0) {
    return 0
  }

  const totalWordles = allWordles.length

  const numWins = await db.guess.count({
    where: { userId, correctCount: 5 },
  })

  return (numWins / totalWordles) * 100
}

export const averageScore: QueryResolvers['averageScore'] = async () => {
  const { id: userId } = getAuthedUser()

  const guessAggregate = await db.guess.aggregate({
    where: { userId, correctCount: 5 },
    _avg: { nthGuess: true },
  })

  return guessAggregate._avg.nthGuess
}
