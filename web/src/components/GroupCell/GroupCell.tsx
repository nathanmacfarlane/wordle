/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Spinner,
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
    You're not in any groups yet.
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
      <VStack alignItems="start" spacing={2} w="full">
        {group.scores.map(({ user, score }) => (
          <Card key={user.id} w="full" variant="filled">
            <CardHeader>
              <Heading fontWeight="medium" size="sm">
                <b>{score}</b> {user.name}
              </Heading>
            </CardHeader>
          </Card>
        ))}
      </VStack>
    </VStack>
  )
}
