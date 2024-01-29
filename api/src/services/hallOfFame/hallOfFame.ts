import { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const hallOfFame: QueryResolvers['hallOfFame'] = async () => {
  const monthlyWins = await db.monthlyWin.findMany({
    include: {
      user: true,
    },
    orderBy: [
      {
        year: 'desc',
      },
      {
        month: 'desc',
      },
    ],
  })

  return monthlyWins.map((monthlyWin) => {
    const month = MONTHS[monthlyWin.month]
    return {
      month,
      year: monthlyWin.year.toString(),
      avgScore: monthlyWin.avgScore,
      user: {
        id: monthlyWin.user.id,
        name: monthlyWin.user.name,
        email: monthlyWin.user.email,
        imageUrl: monthlyWin.user.imageUrl,
      },
    }
  })
}
