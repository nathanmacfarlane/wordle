import type {
  Badge,
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

  const [
    totalWordlesResult,
    winPercentageResult,
    averageScoreResult,
    earnedBadges,
  ] = await Promise.all([
    totalWordles({ id: userId }),
    winPercentage({ id: userId }),
    averageScore({ id: userId }),
    db.earnedBadge.findMany({
      where: { userId },
      orderBy: { firstReceived: 'desc' },
    }),
  ])

  const badgeTitle = (badge: Badge) => {
    switch (badge) {
      case 'guess_in_1':
        return 'First Try'
      case 'guess_in_2':
        return 'Second Try'
      case 'monthly_winner':
        return 'Monthly Winner'
      case 'monthly_avg_3':
        return 'Monthly Average of 3'
      case 'monthly_avg_4':
        return 'Monthly Average of 4'
      case 'weekly_avg_3':
        return 'Weekly Average of 3'
      case 'weekly_avg_4':
        return 'Weekly Average of 4'
      case 'win_streak_3_days':
        return '3 Day Win Streak'
      case 'win_streak_5_days':
        return '5 Day Win Streak'
    }
  }

  const badges: BadgeInfo[] = earnedBadges.map(({ badge, firstReceived }) => {
    return {
      badge,
      title: badgeTitle(badge),
      firstReceived,
    }
  })

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
