import { Box, Spinner } from '@chakra-ui/react'
import { Delete } from 'lucide-react'

export type VirtualKeyboardKeyProps = {
  letter: string
  onPress: (letter: string) => void
  showSpinner?: boolean
  keyStatus?: 'CORRECT' | 'INCORRECT' | 'MISPLACED'
}

const VirtualKeyboardKey: React.FC<VirtualKeyboardKeyProps> = ({
  letter,
  onPress,
  showSpinner,
  keyStatus,
}) => {
  return (
    <Box
      bg={
        keyStatus === 'CORRECT'
          ? '#7eab70'
          : keyStatus === 'INCORRECT'
          ? '#7a7b7e'
          : keyStatus === 'MISPLACED'
          ? '#c6b76a'
          : 'gray.300'
      }
      cursor="pointer"
      borderRadius="md"
      width={{
        base:
          letter === 'ENTER' ? '70px' : letter === 'delete' ? '40px' : '30px',
        md: letter === 'ENTER' ? '70px' : '50px',
      }}
      opacity={0.8}
      _active={{ opacity: 1.0 }}
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
