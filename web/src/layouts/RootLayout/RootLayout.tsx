import { Box, HStack, VStack } from '@chakra-ui/react'
import { UserButton } from '@clerk/clerk-react'

import NavSidebar from 'src/components/NavSidebar/NavSidebar'
import NavTabs from 'src/components/NavTabs/NavTabs'

type RootLayoutProps = {
  children?: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <VStack spacing={2} h="100vh">
      <Box bg="gray.300" px="6" py="2" w="full">
        <HStack justifyContent="space-between">
          <Box>Mac Wordle</Box>
          <UserButton />
        </HStack>
      </Box>
      <HStack w="100%" h="100%" flex={1} alignItems="start" px="2">
        <Box display={{ base: 'none', md: 'block' }}>
          <NavSidebar />
        </Box>
        <Box width="100%" h="100%">
          {children}
        </Box>
      </HStack>
      <Box display={{ base: 'block', md: 'none' }} w="100%">
        <NavTabs />
      </Box>
    </VStack>
  )
}

export default RootLayout
