import { Box } from '@chakra-ui/react'
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
    <Box
      bg="gray.300"
      cursor="pointer"
      borderRadius="md"
      width={{
        base:
          letter === 'ENTER' ? '70px' : letter === 'delete' ? '40px' : '30px',
        md: letter === 'ENTER' ? '70px' : '50px',
      }}
      _active={{ bg: 'gray.400' }}
      height="50px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={() => onPress(letter)}
    >
      {letter === 'delete' ? <Delete size="18" /> : letter}
    </Box>
  )
}

export default VirtualKeyboardKey
