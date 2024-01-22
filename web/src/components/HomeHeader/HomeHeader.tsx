/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'

import { useAuth } from 'src/auth'
import TodaysAverageScoreCell from 'src/components/TodaysAverageScoreCell'

const HomeHeader = () => {
  const user = useAuth()

  return (
    <Stack
      justifyContent="space-between"
      alignItems={{ base: 'normal', sm: 'center' }}
      flexDirection={{ base: 'column', xl: 'row' }}
    >
      <Heading>Welcome Back, {user.userMetadata?.firstName}! 👋</Heading>
      <Stack spacing={4} flexDirection={{ base: 'column', sm: 'row' }}>
        <Card variant="filled">
          <CardBody>
            <Stat>
              <StatLabel>Today's Wordle</StatLabel>
              <StatNumber>
                <Button variant="link" color="teal">
                  Play today's game
                </Button>
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card variant="filled">
          <CardBody>
            <Stat>
              <StatLabel>Today's Average Score</StatLabel>
              <StatNumber>
                <TodaysAverageScoreCell />
              </StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </Stack>
    </Stack>
  )
}

export default HomeHeader
