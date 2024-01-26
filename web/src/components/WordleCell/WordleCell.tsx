import { useEffect, useState } from 'react'

import { Box, Text } from '@chakra-ui/react'
import { BoardCellStatus } from 'types/graphql'

export type WordleCellProps = {
  value?: string
  status: BoardCellStatus
  size?: 'sm' | 'default'
  triggerFlip?: boolean
}

const WordleCell: React.FC<WordleCellProps> = ({
  value,
  status,
  size,
  triggerFlip,
}) => {
  const [flipped, setFlipped] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  const bg = !animationComplete
    ? undefined
    : status === 'CORRECT'
    ? '#7eab70'
    : status === 'INCORRECT'
    ? '#7a7b7e'
    : status === 'MISPLACED'
    ? '#c6b76a'
    : undefined

  const textColor = status === 'EMPTY' || !animationComplete ? 'black' : ''

  const outline =
    status === 'EMPTY' || !animationComplete ? '1px solid #7a7b7e' : undefined

  const wrapperSize =
    size === 'sm' ? { base: '20px', md: '30px' } : { base: '50px', md: '60px' }

  useEffect(() => {
    if (triggerFlip && value) {
      setFlipped(true)
      setTimeout(() => {
        setAnimationComplete(true)
      }, 300)
    }
  }, [triggerFlip, value])

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
        transition="transform 1s ease, color 0.25s ease"
        transform={flipped ? 'rotateX(-180deg)' : undefined}
      >
        <Text
          fontSize={{ base: '22px', md: '32px' }}
          fontWeight="bold"
          color={textColor}
          transform={animationComplete ? 'rotateX(180deg)' : undefined}
        >
          {value}
        </Text>
      </Box>
    </Box>
  )
}

export default WordleCell
