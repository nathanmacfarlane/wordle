import { Spinner, Text } from '@chakra-ui/react'
import type {
  FindTodaysAverageScoreQuery,
  FindTodaysAverageScoreQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindTodaysAverageScoreQuery {
    todaysAverageScore
  }
`

export const Loading = () => <Spinner size="sm" />

export const Empty = () => <Text>-</Text>

export const Failure = ({
  error,
}: CellFailureProps<FindTodaysAverageScoreQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  todaysAverageScore,
}: CellSuccessProps<
  FindTodaysAverageScoreQuery,
  FindTodaysAverageScoreQueryVariables
>) => {
  return <Text>{todaysAverageScore?.toFixed(1) || '-'}</Text>
}
