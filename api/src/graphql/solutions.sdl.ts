export const schema = gql`
  type Solution {
    id: Int!
    date: DateTime!
    word: String!
  }

  type Query {
    solution: Solution @requireAuth
  }
`
