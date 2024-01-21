import { PropsWithChildren } from 'react'

import { Box } from '@chakra-ui/react'

export type NavTabItemProps = {
  onClick: () => void
}

export const NavTabItem: React.FC<PropsWithChildren<NavTabItemProps>> = ({
  children,
  onClick,
}) => {
  return (
    <Box
      w="100%"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      py="2"
      onClick={onClick}
    >
      {children}
    </Box>
  )
}
