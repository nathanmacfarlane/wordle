import type { QueryResolvers } from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { getCurrentDateForUser } from 'src/utils/generateUserDate'

export const todaysAverageScore: QueryResolvers['todaysAverageScore'] =
  async () => {
    const { id: userId } = getAuthedUser()
    const date = await getCurrentDateForUser(userId)

    const userNthGuesses = await db.guess.aggregate({
      where: {
        solution: { date },
        correctCount: 5,
      },
      _avg: { nthGuess: true },
    })

    if (!userNthGuesses._avg.nthGuess) {
      return null
    }

    return userNthGuesses._avg.nthGuess
  }
