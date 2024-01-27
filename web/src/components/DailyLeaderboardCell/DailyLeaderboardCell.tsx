import {
  Center,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import type {
  FindDailyLeaderboardQuery,
  FindDailyLeaderboardQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BoardRowView from '../BoardRow/BoardRow'

export const QUERY = gql`
  query FindDailyLeaderboardQuery($date: Date!) {
    dailyLeaderboard(date: $date) {
      board {
        rows {
          cells {
            letter
            status
          }
        }
      }
      user {
        id
        name
        email
        imageUrl
      }
    }
  }
`

export const Loading = () => (
  <Center w="100%" minH="100">
    <Spinner />
  </Center>
)

export const Empty = () => (
  <Center w="100%" minH="100">
    <Text>No Leaderboard yet</Text>
  </Center>
)

export const Failure = ({
  error,
}: CellFailureProps<FindDailyLeaderboardQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  dailyLeaderboard,
}: CellSuccessProps<
  FindDailyLeaderboardQuery,
  FindDailyLeaderboardQueryVariables
>) => {
  return (
    <SimpleGrid columns={dailyLeaderboard.length <= 1 ? 1 : 2} spacing={4}>
      {dailyLeaderboard.map(({ board, user }) => {
        const firstName = user.name.split(' ')[0]
        return (
          <VStack spacing={0.4} key={user.id}>
            <HStack>
              <Image src={user.imageUrl} borderRadius="full" boxSize="30px" />
              <Text fontWeight="bold">{firstName}</Text>
            </HStack>
            {board.rows.map((row, index) => (
              <BoardRowView key={index} boardRow={row} size="sm" />
            ))}
          </VStack>
        )
      })}
    </SimpleGrid>
  )
}
