import { SolutionQuery, SolutionQueryVariables } from 'types/graphql'

import { useQuery } from '@redwoodjs/web'

export const FETCH_SOLUTION_QUERY = gql`
  query SolutionQuery {
    solution {
      id
      date
      word
    }
  }
`

export const useFetchSolution = (
  options?: GraphQLQueryHookOptions<SolutionQuery, SolutionQueryVariables>
) => {
  return useQuery<SolutionQuery, SolutionQueryVariables>(
    FETCH_SOLUTION_QUERY,
    options
  )
}
