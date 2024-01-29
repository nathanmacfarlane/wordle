import { QueryResolvers } from 'types/graphql'

export const hallOfFame: QueryResolvers['hallOfFame'] = async () => {
  return [
    {
      month: 'March',
      year: '2024',
      avgScore: 3.23,
      user: {
        id: '1',
        name: 'Matt Macfarlane',
        email: 'mattmacfarlane@gmail.com',
        imageUrl: 'https://avatars.githubusercontent.com/u/10000000?v=4',
      },
    },
    {
      month: 'February',
      year: '2024',
      avgScore: 3.15,
      user: {
        id: '1',
        name: 'Matt Macfarlane',
        email: 'mattmacfarlane@gmail.com',
        imageUrl: 'https://avatars.githubusercontent.com/u/10000000?v=4',
      },
    },
    {
      month: 'January',
      year: '2024',
      avgScore: 2.89,
      user: {
        id: '2',
        name: 'Nate Macfarlane',
        email: 'nathanmmacfarlane@gmail.com',
        imageUrl: 'https://avatars.githubusercontent.com/u/10000000?v=4',
      },
    },
  ]
}
