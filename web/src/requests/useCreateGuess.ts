import {
  CreateGuessMutation,
  CreateGuessMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

export const CREATE_GUESS_QUERY = gql`
  mutation CreateGuessMutation($input: CreateGuessInput!) {
    createGuess(input: $input) {
      id
      word
      nthGuess
      correctCount
      misplacedCount
      incorrectCount
    }
  }
`

export const useCreateGuess = (
  options?: GraphQLMutationHookOptions<
    CreateGuessMutation,
    CreateGuessMutationVariables
  >
) => {
  return useMutation<CreateGuessMutation, CreateGuessMutationVariables>(
    CREATE_GUESS_QUERY,
    options
  )
}
