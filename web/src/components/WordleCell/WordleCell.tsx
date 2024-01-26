import { Box, Text } from '@chakra-ui/react'
import { BoardCellStatus } from 'types/graphql'

export type WordleCellProps = {
  value?: string
  status: BoardCellStatus
  size?: 'sm' | 'default'
}

const WordleCell: React.FC<WordleCellProps> = ({ value, status, size }) => {
  const bg =
    status === 'CORRECT'
      ? '#7eab70'
      : status === 'INCORRECT'
      ? '#7a7b7e'
      : status === 'MISPLACED'
      ? '#c6b76a'
      : undefined

  const textColor = status === 'EMPTY' ? 'black' : ''

  const outline = status === 'EMPTY' ? '1px solid #7a7b7e' : undefined

  const wrapperSize =
    size === 'sm' ? { base: '20px', md: '30px' } : { base: '50px', md: '60px' }

  return (
    <Box w={wrapperSize} h={wrapperSize} p={size === 'sm' ? '0.5' : '1'}>
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
        <Text
          fontSize={{ base: '22px', md: '32px' }}
          fontWeight="bold"
          color={textColor}
        >
          {value}
        </Text>
      </Box>
    </Box>
  )
}

export default WordleCell
