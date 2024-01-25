import { Percent } from 'lucide-react'
import type {
  FindWinPercentageQuery,
  FindWinPercentageQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import StatCard from '../StatCard/StatCard'

export const QUERY = gql`
  query FindWinPercentageQuery {
    winPercentage
  }
`

export const Loading = () => (
  <StatCard label="Win Percentage" isLoading icon={Percent} />
)

export const Empty = () => <StatCard label="Win Percentage" icon={Percent} />

export const Failure = ({
  error,
}: CellFailureProps<FindWinPercentageQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  winPercentage,
}: CellSuccessProps<
  FindWinPercentageQuery,
  FindWinPercentageQueryVariables
>) => {
  return (
    <StatCard
      label="Win Percentage"
      icon={Percent}
      value={`${winPercentage.toFixed(1)}%`}
    />
  )
}
