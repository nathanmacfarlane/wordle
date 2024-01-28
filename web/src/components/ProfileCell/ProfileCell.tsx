import {
  Avatar,
  Center,
  Divider,
  HStack,
  Heading,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { FindProfileQuery, FindProfileQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { BadgeAward } from './BadgeAward'

export const QUERY = gql`
  query FindProfileQuery($id: String) {
    profile: profile(id: $id) {
      id
      name
      email
      imageUrl
      totalWordles
      winPercentage
      averageScore
      badges {
        badge
        title
        firstReceived
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
  <Failure error={new Error('Unable to find profile')} />
)

export const Failure = ({
  error,
}: CellFailureProps<FindProfileQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  profile,
}: CellSuccessProps<FindProfileQuery, FindProfileQueryVariables>) => {
  return (
    <VStack alignItems="start" spacing={5}>
      <VStack w="full" spacing={0}>
        <Avatar src={profile.imageUrl} name={profile.name} size="xl" />
        <Heading size="lg">{profile.name}</Heading>
        <Text color="gray.600">{profile.email}</Text>
      </VStack>
      <HStack w="full">
        <Stat>
          <StatLabel textAlign="center">Total Wordles</StatLabel>
          <StatNumber textAlign="center">{profile.totalWordles}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel textAlign="center">Win Percentage</StatLabel>
          <StatNumber textAlign="center">
            {profile.winPercentage
              ? `${profile.winPercentage.toFixed(0)}%`
              : '-'}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel textAlign="center">Average Score</StatLabel>
          <StatNumber textAlign="center">
            {profile.averageScore ? profile.averageScore.toFixed(2) : '-'}
          </StatNumber>
        </Stat>
      </HStack>
      <Divider />
      <VStack alignItems="start">
        <Heading size="md" fontWeight="semibold">
          Badges
        </Heading>
        <HStack
          overflowX="scroll"
          w="96vw"
          bg="gray.200"
          pt="3"
          rounded="md"
          css={{
            '&::-webkit-scrollbar': {
              width: '0px',
            },
          }}
        >
          {profile.badges.length > 0 ? (
            profile.badges.map(({ badge, firstReceived, title }) => {
              return (
                <BadgeAward
                  key={badge}
                  badge={badge}
                  title={title}
                  firstReceived={firstReceived}
                />
              )
            })
          ) : (
            <Center w="full" minH="50">
              <Text>No badges yet</Text>
            </Center>
          )}
        </HStack>
      </VStack>
    </VStack>
  )
}
