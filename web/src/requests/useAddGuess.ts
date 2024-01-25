import { AddGuessMutation, AddGuessMutationVariables } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

export const ADD_GUESS_QUERY = gql`
  mutation AddGuessMutation($date: Date!, $word: String!) {
    addGuess(date: $date, word: $word) {
      board {
        date
        rows {
          cells {
            letter
            status
          }
        }
        isComplete
        keyboard {
          correctLetters
          incorrectLetters
          misplacedLetters
        }
      }
      error
    }
  }
`

export const useAddGuess = (
  options?: GraphQLMutationHookOptions<
    AddGuessMutation,
    AddGuessMutationVariables
  >
) => {
  return useMutation<AddGuessMutation, AddGuessMutationVariables>(
    ADD_GUESS_QUERY,
    options
  )
}
