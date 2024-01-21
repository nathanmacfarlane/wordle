/* eslint-disable react/no-unescaped-entities */
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { GroupsQuery } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query GroupsQuery {
    groups {
      id
      name
      users {
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
    You're not in any groups yet.
  </Center>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ groups }: CellSuccessProps<GroupsQuery>) => {
  return (
    <VStack spacing={2} alignItems="start">
      {groups.map((group) => (
        <Card key={group.id} size="sm" w="full" variant="filled">
          <CardHeader>
            <Heading size="md">{group.name}</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={2} alignItems="start">
              {group.users.map((user) => (
                <HStack key={user.id}>
                  <Avatar size="sm" name={user.name} src={user.imageUrl} />
                  <Text>{user.name}</Text>
                </HStack>
              ))}
            </VStack>
          </CardBody>
          <CardFooter>
            <Button
              variant="solid"
              colorScheme="teal"
              size="sm"
              onClick={() => navigate(routes.group({ id: group.id }))}
              width={{ base: 'full', md: 'auto' }}
            >
              View Group
            </Button>
          </CardFooter>
        </Card>
      ))}
    </VStack>
  )
}
