import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  HStack,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { UserButton } from '@clerk/clerk-react'
import { Menu } from 'lucide-react'

import NavSidebar from 'src/components/NavSidebar/NavSidebar'
import { TimezoneProvider } from 'src/components/TimezoneProvider/TimezoneProvider'

type RootLayoutProps = {
  children?: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <TimezoneProvider>
      <VStack spacing={2} h="100vh">
        <Box bg="gray.300" px="6" py="2" w="full">
          <HStack justifyContent="space-between">
            <Box display={{ base: 'block', md: 'none' }}>
              <IconButton
                icon={<Menu />}
                aria-label="Menu"
                variant="ghost"
                onClick={onOpen}
              />
            </Box>
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
      </VStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={50}>
            <NavSidebar onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </TimezoneProvider>
  )
}

export default RootLayout
