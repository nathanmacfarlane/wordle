import { useMemo } from 'react'

import { HStack, Text } from '@chakra-ui/react'
import { Puzzle, User, Users } from 'lucide-react'

import { navigate, routes, useLocation } from '@redwoodjs/router'

import { NavTabItem } from './NavTabItem'

const NavTabs = () => {
  const { pathname: activePath } = useLocation()

  const items = useMemo(
    () => [
      { label: 'Profile', icon: User, route: routes.profile() },
      { label: 'Today', icon: Puzzle, route: routes.today() },
      { label: 'Leagues', icon: Users, route: routes.leagues() },
    ],
    []
  )

  return (
    <HStack spacing={0} justifyContent="space-around" bg="gray.300" w="100%">
      {items.map((item) => {
        const isActive =
          item.route === '/'
            ? activePath === item.route
            : activePath.startsWith(item.route)
        const Icon = item.icon
        const iconProps = isActive ? { fill: '#aaa', strokeWidth: 2 } : {}
        return (
          <NavTabItem key={item.label} onClick={() => navigate(item.route)}>
            <Icon size={18} {...iconProps} />
            <Text fontWeight={isActive ? 'semibold' : undefined}>
              {item.label}
            </Text>
          </NavTabItem>
        )
      })}
    </HStack>
  )
}

export default NavTabs
