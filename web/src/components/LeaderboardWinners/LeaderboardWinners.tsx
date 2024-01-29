import { useMemo } from 'react'

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
  const [firstPlace, secondPlace, thirdPlace] = useMemo(() => {
    const firstPlace = winners.length > 0 ? winners[0] : undefined
    const secondPlace = winners.length > 1 ? winners[1] : undefined
    const thirdPlace = winners.length > 2 ? winners[2] : undefined
    return [firstPlace, secondPlace, thirdPlace]
  }, [winners])

  return (
    <HStack w="full" justifyContent="center" alignItems="flex-end">
      {secondPlace && (
        <LeaderboardWinner
          place={2}
          name={secondPlace.name}
          imageUrl={secondPlace.imageUrl}
          score={secondPlace.score}
        />
      )}
      {firstPlace && (
        <LeaderboardWinner
          place={1}
          name={firstPlace.name}
          imageUrl={firstPlace.imageUrl}
          score={firstPlace.score}
        />
      )}
      {thirdPlace && (
        <LeaderboardWinner
          place={3}
          name={thirdPlace.name}
          imageUrl={thirdPlace.imageUrl}
          score={thirdPlace.score}
        />
      )}
    </HStack>
  )
}

export default LeaderboardWinners
