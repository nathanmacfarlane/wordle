export const schema = gql`
  type User {
    id: String!
    name: String!
    email: String!
    imageUrl: String!
  }

  type Query {
    totalWordles: Int! @requireAuth
    winPercentage: Float @requireAuth
    averageScore: Float @requireAuth
  }

  type Mutation {
    updateUserTz(timezone: String!): Boolean @requireAuth
  }
`
