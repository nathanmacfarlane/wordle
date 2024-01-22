export const schema = gql`
  type Guess {
    id: String!

    word: String!
    nthGuess: Int!

    correctCount: Int!
    misplacedCount: Int!
    incorrectCount: Int!
  }

  type Query {
    guesses(date: DateTime): [Guess!]! @requireAuth
    todaysAverageScore: Float @requireAuth
  }

  input CreateGuessInput {
    word: String!
  }

  type Mutation {
    createGuess(input: CreateGuessInput!): Guess! @requireAuth
  }
`
