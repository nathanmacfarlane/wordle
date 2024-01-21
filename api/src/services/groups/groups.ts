import { endOfMonth, startOfMonth } from 'date-fns'
import type { QueryResolvers, User } from 'types/graphql'

import { getAuthedUser } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const groups: QueryResolvers['groups'] = () => {
  const { id } = getAuthedUser()
  return db.group.findMany({
    where: { users: { some: { id } } },
    include: { users: true },
  })
}

export const group: QueryResolvers['group'] = async ({ id, date: _date }) => {
  const { id: userId } = getAuthedUser()

  const som = startOfMonth(_date || new Date())
  const eom = endOfMonth(_date || new Date())

  const [group] = await Promise.all([
    db.group.findUniqueOrThrow({
      where: { id, users: { some: { id: userId } } },
      include: { users: true },
    }),
  ])

  const scores = await db.guess.findMany({
    where: {
      userId: { in: group.users.map((user) => user.id) },
      solution: {
        date: { gte: som, lte: eom },
      },
    },
    include: { user: true },
  })

  const scoresByUser = scores.reduce((acc, score) => {
    const existingScore = acc.find((s) => s.user.id === score.userId)
    if (existingScore) {
      existingScore.score += 1
    } else {
      acc.push({ user: score.user, score: 1 })
    }
    return acc
  }, [] as { user: User; score: number }[])

  const sortedScores = scoresByUser.sort((a, b) => b.score - a.score)

  return {
    id: group.id,
    name: group.name,
    scores: sortedScores,
  }
}
