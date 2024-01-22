import { HStack, VStack } from '@chakra-ui/react'

import VirtualKeyboardKey from '../VirtualKeyboardKey/VirtualKeyboardKey'

const KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'delete'],
]

export type VirtualKeyboardProps = {
  onPress: (letter: string) => void
  isSubmitting?: boolean
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onPress,
  isSubmitting,
}) => {
  return (
    <VStack w="full" spacing={{ base: 1, md: 2 }}>
      {KEYBOARD.map((row) => (
        <HStack key={row.join('')} spacing={{ base: 1, md: 2 }}>
          {row.map((letter) => (
            <VirtualKeyboardKey
              key={letter}
              letter={letter}
              onPress={onPress}
              showSpinner={isSubmitting && letter === 'ENTER'}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  )
}

export default VirtualKeyboard
