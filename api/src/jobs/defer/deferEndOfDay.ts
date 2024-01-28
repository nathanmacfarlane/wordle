import { addDays, startOfDay } from 'date-fns'

import { defer } from 'src/jobs/clients/defer'
import { db } from 'src/lib/db'

const deferEndOfDay = async () => {
  const today = startOfDay(new Date())
  const fiveDaysAgo = addDays(today, -5)
  const fourDaysAgo = addDays(today, -4)
  const threeDaysAgo = addDays(today, -3)
  const twoDaysAgo = addDays(today, -2)
  const yesterday = addDays(today, -1)

  const [d1Winners, d2Winners, d3Winners, d4Winners, d5Winners] =
    await Promise.all(
      [fiveDaysAgo, fourDaysAgo, threeDaysAgo, twoDaysAgo, yesterday].map(
        (date) =>
          db.guess
            .findMany({
              where: {
                correctCount: 5,
                solution: { date },
              },
              orderBy: { nthGuess: 'asc' },
            })
            .then((winners) => {
              if (winners.length === 0) return []
              const winningGuessCount = winners[0].nthGuess
              return winners.filter(
                (winner) => winner.nthGuess === winningGuessCount
              )
            })
      )
    )

  const threeDayStreakWinners = d3Winners.filter((d3Winner) => {
    return (
      d4Winners.find((d4Winner) => d4Winner.userId === d3Winner.userId) &&
      d5Winners.find((d5Winner) => d5Winner.userId === d3Winner.userId)
    )
  })

  const fiveDayStreakWinners = d1Winners.filter((d1) => {
    return (
      d2Winners.find((d) => d.userId === d1.userId) &&
      d3Winners.find((d) => d.userId === d1.userId) &&
      d4Winners.find((d) => d.userId === d1.userId) &&
      d5Winners.find((d) => d.userId === d1.userId)
    )
  })

  // give the win_streak_3_days badge to identified users
  await Promise.all(
    threeDayStreakWinners.map(async (winner) => {
      // 'win_streak_3_days'
      await db.earnedBadge.upsert({
        where: {
          userId_badge: {
            userId: winner.userId,
            badge: 'win_streak_3_days',
          },
        },
        create: {
          userId: winner.userId,
          badge: 'win_streak_3_days',
          firstReceived: new Date(),
        },
        update: {},
      })
    })
  )

  // give the win_streak_5_days badge to identified users
  await Promise.all(
    fiveDayStreakWinners.map(async (winner) => {
      // 'win_streak_5_days'
      await db.earnedBadge.upsert({
        where: {
          userId_badge: {
            userId: winner.userId,
            badge: 'win_streak_5_days',
          },
        },
        create: {
          userId: winner.userId,
          badge: 'win_streak_5_days',
          firstReceived: new Date(),
        },
        update: {},
      })
    })
  )

  return {
    threeDayStreakWinners: threeDayStreakWinners.map((winner) => winner.userId),
    fiveDayStreakWinners: fiveDayStreakWinners.map((winner) => winner.userId),
  }
}

// setup cron that runs 6 hours after the start of every day
export default defer.cron(deferEndOfDay, '0 6 * * *')
