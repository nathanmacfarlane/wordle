import { Box, Text } from '@chakra-ui/react'

export type WordleCellProps = {
  value?: string
  status?: 'correct' | 'incorrect' | 'misplaced' | 'none'
}

const WordleCell: React.FC<WordleCellProps> = ({ value, status }) => {
  const bg =
    status === 'correct'
      ? '#7eab70'
      : status === 'incorrect'
      ? '#7a7b7e'
      : status === 'misplaced'
      ? '#c6b76a'
      : undefined

  const textColor = status === 'none' ? 'black' : ''

  const outline = status === 'none' ? '1px solid #7a7b7e' : undefined

  return (
    <Box w="60px" h="60px" p="1">
      <Box
        bg={bg}
        outline={outline}
        rounded="3px"
        w="full"
        h="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="32px" fontWeight="bold" color={textColor}>
          {value}
        </Text>
      </Box>
    </Box>
  )
}

export default WordleCell
