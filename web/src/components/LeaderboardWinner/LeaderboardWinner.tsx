import { Avatar, Box, Circle, Text, VStack } from '@chakra-ui/react'

export type LeaderboardWinnerProps = {
  place: 1 | 2 | 3
  name: string
  imageUrl: string
  score: number
}

const LeaderboardWinner: React.FC<LeaderboardWinnerProps> = (props) => {
  const { name, imageUrl, place, score } = props

  const color =
    place === 1 ? 'yellow.400' : place === 2 ? '#CD7F32' : 'gray.300'

  const height = place === 1 ? '200px' : place === 2 ? '175px' : '150px'

  return (
    <VStack>
      <Avatar
        size="xl"
        name={name}
        src={imageUrl}
        borderColor={color}
        borderWidth={5}
        shadow="lg"
      />
      <VStack
        bg={color}
        roundedTop="lg"
        p="2"
        spacing={1}
        height={height}
        w="100px"
      >
        <Circle size="10" bg="white">
          <Text color="black" fontWeight="bold" fontSize="24">
            {place}
          </Text>
        </Circle>
        <Box fontSize="lg">{name}</Box>
        <Box fontSize="xl" fontWeight="semibold">
          {score.toFixed(2)}
        </Box>
      </VStack>
    </VStack>
  )
}

export default LeaderboardWinner
