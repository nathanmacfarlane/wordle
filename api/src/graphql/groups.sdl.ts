export const schema = gql`
  type Group {
    id: String!
    name: String!
    users: [User!]!
  }

  type GroupWithMonthlyScores {
    id: String!
    name: String!
    scores: [Score!]!
  }

  type Score {
    user: User!
    score: Int!
  }

  type Query {
    groups: [Group!]! @requireAuth
    group(id: String!, date: DateTime): GroupWithMonthlyScores @requireAuth
  }
`
