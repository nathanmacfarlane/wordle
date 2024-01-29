import { HStack } from '@chakra-ui/react'

import LeaderboardWinner from '../LeaderboardWinner/LeaderboardWinner'

export type LeaderboardWinnersProps = {
  winners: {
    name: string
    imageUrl: string
    score: number
  }[]
}

const LeaderboardWinners: React.FC<LeaderboardWinnersProps> = ({ winners }) => {
  const firstPlace = winners[0]
  const secondPlace = winners[1]
  const thirdPlace = winners[2]

  return (
    <HStack w="full" justifyContent="center" alignItems="flex-end">
      <LeaderboardWinner
        place={2}
        name={secondPlace.name}
        imageUrl={secondPlace.imageUrl}
        score={secondPlace.score}
      />
      <LeaderboardWinner
        place={1}
        name={firstPlace.name}
        imageUrl={firstPlace.imageUrl}
        score={firstPlace.score}
      />
      <LeaderboardWinner
        place={3}
        name={thirdPlace.name}
        imageUrl={thirdPlace.imageUrl}
        score={thirdPlace.score}
      />
    </HStack>
  )
}

export default LeaderboardWinners
