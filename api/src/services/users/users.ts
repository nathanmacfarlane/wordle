import type {
  BadgeInfo,
  MutationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const profile: QueryResolvers['profile'] = async ({ id }) => {
  const userId = id || getAuthedUser().id

  const user = await db.user.findUniqueOrThrow({
    where: { id: userId },
  })

  const [totalWordlesResult, winPercentageResult, averageScoreResult] =
    await Promise.all([
      totalWordles({ id: userId }),
      winPercentage({ id: userId }),
      averageScore({ id: userId }),
    ])

  const badges = [
    {
      badge: 'monthly_winner',
      title: 'Monthly Winner',
      firstReceived: new Date('2021-06-01'),
    },
    {
      badge: 'guess_in_2',
      title: 'Guess in 2',
      firstReceived: new Date('2023-07-14'),
    },
  ].sort(
    (a, b) => b.firstReceived.getTime() - a.firstReceived.getTime()
  ) as BadgeInfo[]

  return {
    ...user,
    totalWordles: totalWordlesResult,
    winPercentage: winPercentageResult,
    averageScore: averageScoreResult,
    badges,
  }
}

export const totalWordles: QueryResolvers['totalWordles'] = async ({ id }) => {
  const userId = id || getAuthedUser().id

  const allWordles = await db.guess.groupBy({
    by: ['solutionId'],
    where: { userId },
  })

  return allWordles.length
}

export const winPercentage: QueryResolvers['winPercentage'] = async ({
  id,
}) => {
  const userId = id || getAuthedUser().id

  const allWordles = await db.guess.groupBy({
    by: ['solutionId'],
    where: { userId },
  })

  if (allWordles.length === 0) {
    return null
  }

  const totalWordles = allWordles.length

  const numWins = await db.guess.count({
    where: { userId, correctCount: 5 },
  })

  return (numWins / totalWordles) * 100
}

export const averageScore: QueryResolvers['averageScore'] = async ({ id }) => {
  const userId = id || getAuthedUser().id

  const guessAggregate = await db.guess.aggregate({
    where: { userId, correctCount: 5 },
    _avg: { nthGuess: true },
  })

  return guessAggregate._avg.nthGuess
}

export const updateUserTz: MutationResolvers['updateUserTz'] = async ({
  timezone,
}) => {
  const { id: userId } = getAuthedUser()

  await db.user.update({
    where: { id: userId },
    data: { timezone },
  })

  return true
}
