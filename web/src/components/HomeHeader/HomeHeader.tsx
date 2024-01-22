/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'

import { navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import TodaysAverageScoreCell from 'src/components/TodaysAverageScoreCell'

const HomeHeader = () => {
  const user = useAuth()

  return (
    <Box w="full">
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
                  <Button
                    variant="link"
                    color="teal"
                    onClick={() => navigate(routes.today())}
                  >
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
    </Box>
  )
}

export default HomeHeader
