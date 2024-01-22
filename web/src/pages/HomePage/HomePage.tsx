import { Box, Divider } from '@chakra-ui/react'

import { Metadata } from '@redwoodjs/web'

import HomeHeader from 'src/components/HomeHeader/HomeHeader'

const HomePage = () => {
  return (
    <>
      <Metadata title="Today" description="Today's Wordle" />

      <Box py="4">
        <HomeHeader />
      </Box>
      <Divider />
    </>
  )
}

export default HomePage
