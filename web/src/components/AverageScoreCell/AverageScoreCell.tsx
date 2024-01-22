import { BarChart } from 'lucide-react'
import type {
  FindAverageScoreQuery,
  FindAverageScoreQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import StatCard from '../StatCard/StatCard'

export const QUERY = gql`
  query FindAverageScoreQuery {
    averageScore
  }
`

export const Loading = () => (
  <StatCard label="Average Score" icon={BarChart} isLoading />
)

export const Empty = () => <StatCard label="Average Score" icon={BarChart} />

export const Failure = ({
  error,
}: CellFailureProps<FindAverageScoreQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  averageScore,
}: CellSuccessProps<FindAverageScoreQuery, FindAverageScoreQueryVariables>) => {
  return (
    <StatCard
      label="Average Score"
      icon={BarChart}
      value={averageScore.toFixed(2)}
    />
  )
}
