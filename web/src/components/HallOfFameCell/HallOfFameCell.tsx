import {
  Avatar,
  Button,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import type {
  FindHallOfFameQuery,
  FindHallOfFameQueryVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindHallOfFameQuery {
    hallOfFame {
      month
      year
      avgScore
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
    No records found.
  </Center>
)

export const Failure = ({
  error,
}: CellFailureProps<FindHallOfFameQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  hallOfFame,
}: CellSuccessProps<FindHallOfFameQuery, FindHallOfFameQueryVariables>) => {
  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>Month</Th>
          <Th>Winner</Th>
          <Th isNumeric>Average Score</Th>
        </Tr>
      </Thead>
      <Tbody>
        {hallOfFame.map(({ user, avgScore, month, year }) => (
          <Tr key={user.id}>
            <Td>{`${month}, ${year}`}</Td>
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
            <Td isNumeric>{avgScore.toFixed(2)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
