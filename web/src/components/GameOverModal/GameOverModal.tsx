import { useEffect } from 'react'

import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

import { useWordleContext } from '../WordleProvider/WordleContext'

const GameOverModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { guesses, gameStatus } = useWordleContext()

  useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'lost') {
      setTimeout(() => {
        onOpen()
      }, 500)
    }
  }, [gameStatus, onOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {gameStatus === 'won' ? 'Congrats!' : 'Oh no'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            {gameStatus === 'won'
              ? `You won in ${guesses.length} guesses`
              : 'You lost'}
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="gray.800"
            color="white"
            _hover={{ bg: 'gray.700' }}
            width="full"
            onClick={onClose}
          >
            View Game
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default GameOverModal
