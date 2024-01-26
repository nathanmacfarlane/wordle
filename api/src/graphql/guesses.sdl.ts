export const schema = gql`
  type Guess {
    id: String!

    word: String!
    nthGuess: Int!

    correctCount: Int!
    misplacedCount: Int!
    incorrectCount: Int!
  }

  type HistoryItem {
    date: Date!
    solution: String!
    score: Int!
  }

  type Query {
    todaysAverageScore: Float @requireAuth
    history: [HistoryItem!]! @requireAuth
  }
`
