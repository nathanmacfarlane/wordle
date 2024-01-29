// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  leaderboard: [
    {
      user: {
        id: '1',
        name: 'Nate Macfarlane',
        email: 'nathanmmacfarlane@gmail.com',
        imageUrl: 'https://avatars.githubusercontent.com/u/1000000?v=4',
      },
      score: 19,
      activeDays: 3,
      averageScore: 6.33,
    },
    {
      user: {
        id: '2',
        name: 'Matt Macfarlane',
        email: 'mattmacfarlane@gmail.com',
        imageUrl: 'https://avatars.githubusercontent.com/u/1000001?v=4',
      },
      score: 18,
      activeDays: 3,
      averageScore: 6,
    },
    {
      user: {
        id: '3',
        name: 'Julie Macfarlane',
        email: 'juliemacfarlane@gmail.com',
        imageUrl: 'https://avatars.githubusercontent.com/u/1000002?v=4',
      },
      score: 15,
      activeDays: 3,
      averageScore: 5,
    },
    {
      user: {
        id: '4',
        name: 'Joe Macfarlane',
        email: 'joemacfarlane@gmail.com',
        imageUrl: 'https://avatars.githubusercontent.com/u/1000003?v=4',
      },
      score: 7,
      activeDays: 2,
      averageScore: 3.5,
    },
    {
      user: {
        id: '5',
        name: 'Elijah Holton',
        email: 'elijahholten@gmail.com',
        imageUrl: 'https://avatars.githubusercontent.com/u/1000005?v=4',
      },
      score: 21,
      activeDays: 3,
      averageScore: 7,
    },
  ],
})
