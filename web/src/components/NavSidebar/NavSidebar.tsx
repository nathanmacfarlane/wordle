import { useMemo } from 'react'

import { VStack } from '@chakra-ui/react'

import { routes, useLocation } from '@redwoodjs/router'

import NavItem from '../NavItem/NavItem'

const NavSidebar = () => {
  const { pathname: activePath } = useLocation()
  const items = useMemo(
    () => [
      { label: 'Today', route: routes.home() },
      { label: 'Groups', route: routes.groups() },
    ],
    []
  )

  return (
    <VStack spacing={1} minW="250px" alignItems="start">
      {items.map((item) => (
        <NavItem
          key={item.route}
          label={item.label}
          route={item.route}
          isActive={item.route === activePath}
        />
      ))}
    </VStack>
  )
}

export default NavSidebar
