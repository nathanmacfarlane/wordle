// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  group: {
    id: '1',
    name: 'Macfarlane Family',
    users: [
      {
        id: '1',
        name: 'Nathan Macfarlane',
        email: 'nathan@gmail.com',
        imageUrl:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yYkFCN2VFTFZjRDMwMURhd0FYQm1BYjdkT2MifQ',
      },
      {
        id: '1',
        name: 'Joe Macfarlane',
        email: 'joe@gmail.com',
        imageUrl:
          'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg',
      },
    ],
  },
})
