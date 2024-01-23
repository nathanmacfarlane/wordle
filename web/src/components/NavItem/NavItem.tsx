import { Box, Button } from '@chakra-ui/react'
import { LucideIcon } from 'lucide-react'

import { navigate } from '@redwoodjs/router'

export type NavItemProps = {
  label: React.ReactNode
  route: string
  isActive?: boolean
  icon: LucideIcon
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  isActive,
  route,
  icon,
  onClick,
}) => {
  const Icon = icon

  return (
    <Box w="full">
      <Button
        variant="ghost"
        w="full"
        rounded={2}
        justifyContent="flex-start"
        isActive={isActive}
        onClick={() => {
          onClick?.()
          navigate(route)
        }}
      >
        <Icon size={18} style={{ marginRight: 5 }} />
        {label}
      </Button>
    </Box>
  )
}

export default NavItem
