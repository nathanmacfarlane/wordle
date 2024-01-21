export const schema = gql`
  type Group {
    id: String!
    name: String!
    users: [User!]!
  }

  type Query {
    groups: [Group!]! @requireAuth
    group(id: String!): Group @requireAuth
  }
`
