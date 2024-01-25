export const schema = gql`
  type Query {
    todaysAverageScore: Float @requireAuth
  }
`
