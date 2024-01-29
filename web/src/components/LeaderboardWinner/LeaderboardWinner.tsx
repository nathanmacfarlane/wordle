import { Avatar, Badge, Box, Circle, Text, VStack } from '@chakra-ui/react'

export type LeaderboardWinnerProps = {
  place: number // 1, 2, or 3
  name: string
  imageUrl: string
  score: number
}

const LeaderboardWinner: React.FC<LeaderboardWinnerProps> = (props) => {
  const { name, imageUrl, place, score } = props

  const firstName = name.split(' ')[0]
  const height = place === 1 ? '175px' : place === 2 ? '150px' : '125px'
  const colorScheme = place === 1 ? 'yellow' : place === 2 ? 'orange' : 'gray'

  return (
    <VStack>
      <VStack
        bg={place === 1 ? 'gray.300' : 'gray.200'}
        roundedTop="lg"
        p="2"
        spacing={2}
        height={height}
        w="75px"
      >
        <Avatar name={firstName} src={imageUrl} shadow="lg" />
        <Badge colorScheme={colorScheme} variant="solid" rounded="sm">
          <Text fontSize="md">{score.toFixed(2)}</Text>
        </Badge>
      </VStack>
    </VStack>
  )
}

export default LeaderboardWinner
