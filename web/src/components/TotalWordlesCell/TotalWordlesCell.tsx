import { Hash } from 'lucide-react'
import type { TotalWordlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import StatCard from '../StatCard/StatCard'

export const QUERY = gql`
  query TotalWordlesQuery {
    totalWordles
  }
`

export const Loading = () => (
  <StatCard label="Total Wordles" icon={Hash} isLoading />
)

export const Empty = () => <StatCard label="Total Wordles" icon={Hash} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  totalWordles,
}: CellSuccessProps<TotalWordlesQuery>) => {
  return (
    <StatCard
      label="Total Wordles"
      icon={Hash}
      value={totalWordles.toString()}
    />
  )
}
