import { useMemo } from 'react'

import { VStack } from '@chakra-ui/react'

import { routes, useLocation } from '@redwoodjs/router'

import NavItem from '../NavItem/NavItem'

const NavSidebar = () => {
  const { pathname: activePath } = useLocation()
  const items = useMemo(
    () => [
      { label: 'Home', route: routes.home() },
      { label: 'Today', route: routes.today() },
      { label: 'Groups', route: routes.groups() },
    ],
    []
  )

  return (
    <VStack spacing={1} minW="250px" alignItems="start">
      {items.map((item) => {
        const isActive =
          item.route === '/'
            ? activePath === item.route
            : activePath.startsWith(item.route)
        return (
          <NavItem
            key={item.route}
            label={item.label}
            route={item.route}
            isActive={isActive}
          />
        )
      })}
    </VStack>
  )
}

export default NavSidebar
