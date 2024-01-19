import { Button } from '@chakra-ui/react'
import { Delete } from 'lucide-react'

export type VirtualKeyboardKeyProps = {
  letter: string
  onPress: (letter: string) => void
}

const VirtualKeyboardKey: React.FC<VirtualKeyboardKeyProps> = ({
  letter,
  onPress,
}) => {
  return (
    <Button
      fontSize={letter === 'ENTER' ? 12 : undefined}
      onClick={() => onPress(letter)}
    >
      {letter === 'delete' ? <Delete size="18" /> : letter}
    </Button>
  )
}

export default VirtualKeyboardKey
