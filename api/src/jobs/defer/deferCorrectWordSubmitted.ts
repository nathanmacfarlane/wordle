import { defer } from 'src/jobs/clients/defer'
import { db } from 'src/lib/db'

export type DeferCorrectWordSubmittedProps = {
  userId: string
  nthGuess: number
}

const deferCorrectWordSubmitted = async (
  props: DeferCorrectWordSubmittedProps
) => {
  const { userId, nthGuess } = props

  if (nthGuess === 1) {
    // 'guess_in_1'
    await db.earnedBadge.upsert({
      where: { userId_badge: { userId, badge: 'guess_in_1' } },
      create: { userId, badge: 'guess_in_1', firstReceived: new Date() },
      update: {},
    })
  } else if (nthGuess === 2) {
    // 'guess_in_2'
    await db.earnedBadge.upsert({
      where: { userId_badge: { userId, badge: 'guess_in_2' } },
      create: { userId, badge: 'guess_in_2', firstReceived: new Date() },
      update: {},
    })
  }
}

export default defer(deferCorrectWordSubmitted)

// case 'monthly_winner':
//   return 'Monthly Winner'
// case 'monthly_avg_3':
//   return 'Monthly Average of 3'
// case 'monthly_avg_4':
//   return 'Monthly Average of 4'
// case 'weekly_avg_3':
//   return 'Weekly Average of 3'
// case 'weekly_avg_4':
//   return 'Weekly Average of 4'
// case 'win_streak_3_days':
//   return '3 Day Win Streak'
// case 'win_streak_5_days':
//   return '5 Day Win Streak'