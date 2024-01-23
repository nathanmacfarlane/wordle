import type { QueryResolvers } from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { getCurrentDateForUser } from 'src/utils/generateUserDate'

export const solution: QueryResolvers['solution'] = async () => {
  const { id: userId } = getAuthedUser()
  const date = await getCurrentDateForUser(userId)

  return db.solution.findFirstOrThrow({
    where: { date: { equals: date } },
  })
}
