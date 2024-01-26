/* eslint-disable react/no-unescaped-entities */
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'

import DailyLeaderBoardCell from 'src/components/DailyLeaderboardCell'

export type DailyLeaderboardProps = {
  date: string
  isOpen: boolean
  onClose: () => void
}

const DailyLeaderboard: React.FC<DailyLeaderboardProps> = ({
  date,
  onClose,
  isOpen,
}) => {
  return (
    <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Today's Leaderboard</DrawerHeader>

        <DrawerBody>
          <DailyLeaderBoardCell date={date} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default DailyLeaderboard
