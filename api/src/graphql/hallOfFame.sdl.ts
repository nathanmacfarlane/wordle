export const schema = gql`
  type HallOfFameEntry {
    month: String!
    year: String!
    user: User!
    avgScore: Float!
  }

  type Query {
    hallOfFame: [HallOfFameEntry!]! @requireAuth
  }
`
