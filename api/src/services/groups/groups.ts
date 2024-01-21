import type { QueryResolvers } from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const groups: QueryResolvers['groups'] = () => {
  const { id } = getAuthedUser()
  return db.group.findMany({
    where: { users: { some: { id } } },
    include: { users: true },
  })
}

export const group: QueryResolvers['group'] = ({ id }) => {
  const { id: userId } = getAuthedUser()
  return db.group.findUnique({
    where: { id, users: { some: { id: userId } } },
    include: { users: true },
  })
}
