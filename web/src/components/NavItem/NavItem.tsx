import { Box, Button } from '@chakra-ui/react'

import { navigate } from '@redwoodjs/router'

export type NavItemProps = {
  label: React.ReactNode
  route: string
  isActive?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ label, isActive, route }) => {
  return (
    <Box w="full">
      <Button
        variant="ghost"
        w="full"
        rounded={2}
        justifyContent="flex-start"
        isActive={isActive}
        onClick={() => navigate(route)}
      >
        {label}
      </Button>
    </Box>
  )
}

export default NavItem
