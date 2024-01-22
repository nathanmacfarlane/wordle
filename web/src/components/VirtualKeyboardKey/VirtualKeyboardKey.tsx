import { Box, Spinner } from '@chakra-ui/react'
import { Delete } from 'lucide-react'

export type VirtualKeyboardKeyProps = {
  letter: string
  onPress: (letter: string) => void
  showSpinner?: boolean
}

const VirtualKeyboardKey: React.FC<VirtualKeyboardKeyProps> = ({
  letter,
  onPress,
  showSpinner,
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
      {showSpinner ? (
        <Spinner />
      ) : (
        <>{letter === 'delete' ? <Delete size="18" /> : letter}</>
      )}
    </Box>
  )
}

export default VirtualKeyboardKey
