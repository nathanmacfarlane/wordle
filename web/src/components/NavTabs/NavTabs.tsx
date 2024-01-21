import { HStack, Text } from '@chakra-ui/react'
import { Puzzle, Users } from 'lucide-react'

import { navigate, routes } from '@redwoodjs/router'

import { NavTabItem } from './NavTabItem'

const NavTabs = () => {
  return (
    <HStack spacing={0} justifyContent="space-around" bg="gray.300" w="100%">
      <NavTabItem onClick={() => navigate(routes.home())}>
        <Puzzle size={18} />
        <Text>Today</Text>
      </NavTabItem>
      <NavTabItem onClick={() => navigate(routes.groups())}>
        <Users size={18} />
        <Text>Groups</Text>
      </NavTabItem>
    </HStack>
  )
}

export default NavTabs
