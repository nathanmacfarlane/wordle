import { HStack, VStack } from '@chakra-ui/react'

import VirtualKeyboardKey from '../VirtualKeyboardKey/VirtualKeyboardKey'

const KEYBOARD = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'delete'],
]

export type VirtualKeyboardProps = {
  onPress: (letter: string) => void
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onPress }) => {
  return (
    <VStack w="full">
      {KEYBOARD.map((row) => (
        <HStack key={row.join('')}>
          {row.map((letter) => (
            <VirtualKeyboardKey
              key={letter}
              letter={letter}
              onPress={onPress}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  )
}

export default VirtualKeyboard
