import { addDays, endOfMonth, startOfMonth } from 'date-fns'

import { defer } from 'src/jobs/clients/defer'
import { db } from 'src/lib/db'

const deferEndOfMonth = async () => {
  // 3 days ago date
  const lastMonth = addDays(new Date(), -3)
  const som = startOfMonth(lastMonth)
  const eom = endOfMonth(lastMonth)

  const userAggregate = await db.guess.groupBy({
    by: ['userId'],
    _avg: { nthGuess: true },
    where: { correctCount: 5, solution: { date: { gte: som, lte: eom } } },
    orderBy: { _avg: { nthGuess: 'asc' } },
  })

  // find all users with the same average score as the top monthly leader
  const lastMonthWinners =
    userAggregate.length === 0
      ? []
      : userAggregate.filter((user) => {
          return (
            user._avg.nthGuess &&
            user._avg.nthGuess === userAggregate[0]._avg.nthGuess
          )
        })

  // give the monthly_winner badge to identified users
  await Promise.all(
    lastMonthWinners.map(async (winner) => {
      // 'monthly_winner'
      await db.earnedBadge.upsert({
        where: {
          userId_badge: {
            userId: winner.userId,
            badge: 'monthly_winner',
          },
        },
        create: {
          userId: winner.userId,
          badge: 'monthly_winner',
          firstReceived: new Date(),
        },
        update: {},
      })
    })
  )

  await db.monthlyWin.createMany({
    data: lastMonthWinners.map((winner) => ({
      month: lastMonth.getMonth(),
      year: lastMonth.getFullYear(),
      avgScore: winner._avg.nthGuess!,
      userId: winner.userId,
    })),
  })

  const usersWithAvg4 = userAggregate.filter(
    (user) => user._avg.nthGuess && user._avg.nthGuess <= 4
  )

  const usersWithAvg3 = userAggregate.filter(
    (user) => user._avg.nthGuess && user._avg.nthGuess <= 3
  )

  // give the monthly_avg_3 badge to identified users
  await Promise.all(
    usersWithAvg3.map(async (user) => {
      // 'monthly_avg_3'
      await db.earnedBadge.upsert({
        where: {
          userId_badge: {
            userId: user.userId,
            badge: 'monthly_avg_3',
          },
        },
        create: {
          userId: user.userId,
          badge: 'monthly_avg_3',
          firstReceived: new Date(),
        },
        update: {},
      })
    })
  )

  // give the monthly_avg_4 badge to identified users
  await Promise.all(
    usersWithAvg4.map(async (user) => {
      // 'monthly_avg_4'
      await db.earnedBadge.upsert({
        where: {
          userId_badge: {
            userId: user.userId,
            badge: 'monthly_avg_4',
          },
        },
        create: {
          userId: user.userId,
          badge: 'monthly_avg_4',
          firstReceived: new Date(),
        },
        update: {},
      })
    })
  )

  return {
    lastMonthWinners: lastMonthWinners.map((winner) => winner.userId),
    usersWithAvg4: usersWithAvg4.map((user) => user.userId),
    usersWithAvg3: usersWithAvg3.map((user) => user.userId),
  }
}

// setup cron that runs 6 hours after the start of a month
export default defer.cron(deferEndOfMonth, '0 6 1 * *')
