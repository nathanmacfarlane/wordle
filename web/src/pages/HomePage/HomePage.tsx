import { Divider, Heading, Stack, VStack } from '@chakra-ui/react'

import { Metadata } from '@redwoodjs/web'

import AverageScoreCell from 'src/components/AverageScoreCell'
import HomeHeader from 'src/components/HomeHeader/HomeHeader'
import TotalWordlesCell from 'src/components/TotalWordlesCell'
import WinPercentage from 'src/components/WinPercentageCell'

const HomePage = () => {
  return (
    <>
      <Metadata title="Today" description="Today's Wordle" />

      <VStack alignItems="start" spacing={4}>
        <HomeHeader />
        <Divider />
        <Heading
          size="md"
          fontWeight="medium"
          w="full"
          textAlign={{ base: 'center', md: 'left' }}
        >
          My Stats
        </Heading>
        <Stack spacing={4} flexDir={{ base: 'column', sm: 'row' }} w="full">
          <TotalWordlesCell />
          <WinPercentage />
          <AverageScoreCell />
        </Stack>
      </VStack>
    </>
  )
}

export default HomePage
