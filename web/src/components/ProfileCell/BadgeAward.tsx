import { useState } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Button,
  Text,
} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'
import { format } from 'date-fns'

export type BadgeAwardProps = {
  badge: string
  title: string
  firstReceived: string
}

export const BadgeAward: React.FC<BadgeAwardProps> = ({
  badge,
  title,
  firstReceived,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  return (
    <>
      <Modal
        isOpen={isFullScreen}
        onClose={() => setIsFullScreen(false)}
        size="xs"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignItems="center" display="flex" flexDirection="column">
            <Image src={`/badges/${badge}.png`} />
            <Text>
              First received: {format(firstReceived, 'MMMM dd, yyyy')}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              w="full"
              onClick={() => setIsFullScreen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Avatar
        key={badge}
        name={badge}
        src={`/badges/${badge}.png`}
        size="xl"
        onClick={() => setIsFullScreen(true)}
      />
    </>
  )
}
