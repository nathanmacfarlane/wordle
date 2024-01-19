import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const solution: QueryResolvers['solution'] = () => {
  const today = new Date()
  return db.solution.findFirstOrThrow({
    where: { date: { equals: today } },
  })
}
