import { GuessesQuery, GuessesQueryVariables } from 'types/graphql'

import { useQuery } from '@redwoodjs/web'

export const FETCH_GUESSES_QUERY = gql`
  query GuessesQuery($date: DateTime) {
    guesses(date: $date) {
      id
      word
      nthGuess
      correctCount
      misplacedCount
      incorrectCount
    }
  }
`

export const useFetchGuesses = (
  options?: GraphQLQueryHookOptions<GuessesQuery, GuessesQueryVariables>
) => {
  return useQuery<GuessesQuery, GuessesQueryVariables>(
    FETCH_GUESSES_QUERY,
    options
  )
}
