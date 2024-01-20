import { startOfDay } from 'date-fns'
import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const solution: QueryResolvers['solution'] = () => {
  const today = startOfDay(new Date())
  return db.solution.findFirstOrThrow({
    where: { date: { equals: today } },
  })
}
