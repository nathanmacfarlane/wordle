export const schema = gql`
  type Board {
    date: Date!
    rows: [BoardRow!]!
    isComplete: Boolean!
    keyboard: Keyboard!
  }

  type Keyboard {
    correctLetters: [String!]!
    incorrectLetters: [String!]!
    misplacedLetters: [String!]!
  }

  type BoardRow {
    cells: [BoardCell!]!
  }

  type BoardCell {
    letter: String
    status: BoardCellStatus!
  }

  enum BoardCellStatus {
    CORRECT
    MISPLACED
    INCORRECT
    EMPTY
  }

  type AddGuessResponse {
    board: Board!
    error: String
  }

  type Mutation {
    addGuess(date: Date!, word: String!): AddGuessResponse! @requireAuth
  }

  type Query {
    board(date: Date!): Board! @requireAuth
  }
`
