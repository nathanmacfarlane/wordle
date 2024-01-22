/* eslint-disable react/no-unescaped-entities */
import {
  Avatar,
  Center,
  Heading,
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
import type { FindGroupQuery, FindGroupQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindGroupQuery($id: String!) {
    group: group(id: $id) {
      id
      name
      scores {
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
  }
`

export const Loading = () => (
  <Center w="100%" minH="100">
    <Spinner />
  </Center>
)

export const Empty = () => (
  <Center w="100%" minH="100">
    You're not in any leagues yet.
  </Center>
)

export const Failure = ({
  error,
}: CellFailureProps<FindGroupQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  group,
}: CellSuccessProps<FindGroupQuery, FindGroupQueryVariables>) => {
  return (
    <VStack alignItems="start">
      <Heading size="lg" fontWeight="semibold">
        {group.name}
      </Heading>
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
          {group.scores.map(({ user, score, activeDays, averageScore }) => (
            <Tr key={user.id}>
              <Td display="flex" alignItems="center">
                <Avatar size="sm" name={user.name} src={user.imageUrl} mr="2" />
                {user.name.split(' ')[0]}
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
