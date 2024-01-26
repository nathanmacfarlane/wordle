import { useMemo } from 'react'

import { VStack } from '@chakra-ui/react'
import { Home, Medal, Puzzle, ScrollText } from 'lucide-react'

import { routes, useLocation } from '@redwoodjs/router'

import NavItem from '../NavItem/NavItem'

export type NavSidebarProps = {
  onClick?: () => void
}

const NavSidebar: React.FC<NavSidebarProps> = ({ onClick }) => {
  const { pathname: activePath } = useLocation()
  const items = useMemo(
    () => [
      { label: 'Dashboard', icon: Home, route: routes.home() },
      { label: 'Today', icon: Puzzle, route: routes.today() },
      { label: 'History', icon: ScrollText, route: routes.history() },
      { label: 'Leaderboard', icon: Medal, route: routes.leaderboard() },
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
            icon={item.icon}
            onClick={onClick}
          />
        )
      })}
    </VStack>
  )
}

export default NavSidebar
