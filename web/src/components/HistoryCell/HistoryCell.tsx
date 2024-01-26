import {
  Badge,
  Button,
  Center,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { addDays, format } from 'date-fns'
import type { FindHistoryQuery, FindHistoryQueryVariables } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindHistoryQuery {
    history {
      date
      score
      solution
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
    <Text>You have not played a game yet</Text>
  </Center>
)

export const Failure = ({
  error,
}: CellFailureProps<FindHistoryQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  history,
}: CellSuccessProps<FindHistoryQuery, FindHistoryQueryVariables>) => {
  return (
    <Table variant="simple" size="sm">
      <TableCaption>History of your games.</TableCaption>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th isNumeric>Score</Th>
          <Th>Solution</Th>
        </Tr>
      </Thead>
      <Tbody>
        {history.map(({ date, solution, score }) => {
          const badgeColorScheme =
            score < 3 ? 'green' : score < 5 ? 'blue' : 'red'
          return (
            <Tr key={date.toString()}>
              <Td>
                <Button
                  variant="link"
                  color="blue.400"
                  size="sm"
                  textUnderlineOffset={5}
                  textDecoration="underline"
                  onClick={() => {
                    const dateString = new Date(date)
                      .toISOString()
                      .split('T')[0]
                    navigate(routes.board({ date: dateString }))
                  }}
                >
                  {format(addDays(new Date(date), 1), 'MMMM dd, yyyy')}
                </Button>
              </Td>
              <Td isNumeric>
                <Badge
                  colorScheme={badgeColorScheme}
                  px="5"
                  py="1"
                  rounded="md"
                >
                  {score}
                </Badge>
              </Td>
              <Td fontFamily="monospace">{solution}</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
