import { Box, HStack, VStack } from '@chakra-ui/react'
import { UserButton } from '@clerk/clerk-react'

import NavSidebar from 'src/components/NavSidebar/NavSidebar'

type RootLayoutProps = {
  children?: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <VStack spacing={2}>
      <Box bg="gray.300" px="6" py="2" w="full">
        <HStack justifyContent="space-between">
          <Box>Mac Wordle</Box>
          <UserButton />
        </HStack>
      </Box>
      <HStack w="100%" alignItems="start" px="4">
        <NavSidebar />
        <Box>{children}</Box>
      </HStack>
    </VStack>
  )
}

export default RootLayout
