import {
  Avatar,
  Button,
  Center,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import type {
  FindLeaderboardQuery,
  FindLeaderboardQueryVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindLeaderboardQuery($date: DateTime) {
    leaderboard(date: $date) {
      user {
        id
        name
        email
        imageUrl
      }
      score
      activeDays
      averageScore
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
    There are no scores yet in this month.
  </Center>
)

export const Failure = ({
  error,
}: CellFailureProps<FindLeaderboardQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  leaderboard,
}: CellSuccessProps<FindLeaderboardQuery, FindLeaderboardQueryVariables>) => {
  return (
    <VStack alignItems="start">
      <Table variant="simple" size="sm">
        <TableCaption>
          Month of {new Date().toLocaleString('default', { month: 'long' })}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th isNumeric>Avg</Th>
            <Th isNumeric>Total</Th>
            <Th isNumeric>Days</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaderboard.map(({ user, score, activeDays, averageScore }) => (
            <Tr key={user.id}>
              <Td display="flex" alignItems="center">
                <Avatar size="sm" name={user.name} src={user.imageUrl} mr="2" />
                <Button
                  variant="link"
                  color="blue.400"
                  size="sm"
                  textUnderlineOffset={5}
                  textDecoration="underline"
                  onClick={() => {
                    navigate(routes.profile({ id: user.id }))
                  }}
                >
                  {user.name.split(' ')[0]}
                </Button>
              </Td>
              <Td isNumeric>{averageScore.toFixed(2)}</Td>
              <Td isNumeric>{score}</Td>
              <Td isNumeric>{activeDays}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  )
}
