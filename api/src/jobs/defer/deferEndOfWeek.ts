import { addDays, endOfWeek, startOfWeek } from 'date-fns'

import { defer } from 'src/jobs/clients/defer'
import { db } from 'src/lib/db'

const deferEndOfWeek = async () => {
  // 3 days ago date
  const lastWeek = addDays(new Date(), -3)
  const som = startOfWeek(lastWeek)
  const eom = endOfWeek(lastWeek)

  const userAggregate = await db.guess.groupBy({
    by: ['userId'],
    _avg: { nthGuess: true },
    where: { correctCount: 5, solution: { date: { gte: som, lte: eom } } },
    orderBy: { _avg: { nthGuess: 'asc' } },
  })

  const usersWithAvg4 = userAggregate.filter(
    (user) => user._avg.nthGuess && user._avg.nthGuess <= 4
  )

  const usersWithAvg3 = userAggregate.filter(
    (user) => user._avg.nthGuess && user._avg.nthGuess <= 3
  )

  // give the weekly_avg_3 badge to identified users
  await Promise.all(
    usersWithAvg3.map(async (user) => {
      // 'weekly_avg_3'
      await db.earnedBadge.upsert({
        where: {
          userId_badge: {
            userId: user.userId,
            badge: 'weekly_avg_3',
          },
        },
        create: {
          userId: user.userId,
          badge: 'weekly_avg_3',
          firstReceived: new Date(),
        },
        update: {},
      })
    })
  )

  // give the weekly_avg_4 badge to identified users
  await Promise.all(
    usersWithAvg4.map(async (user) => {
      // 'weekly_avg_4'
      await db.earnedBadge.upsert({
        where: {
          userId_badge: {
            userId: user.userId,
            badge: 'weekly_avg_4',
          },
        },
        create: {
          userId: user.userId,
          badge: 'weekly_avg_4',
          firstReceived: new Date(),
        },
        update: {},
      })
    })
  )

  return {
    usersWithAvg4: usersWithAvg4.map((user) => user.userId),
    usersWithAvg3: usersWithAvg3.map((user) => user.userId),
  }
}

// setup cron that runs 6 hours after every sunday
export default defer.cron(deferEndOfWeek, '0 6 * * 0')
