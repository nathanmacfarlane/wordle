import { HStack } from '@chakra-ui/react'

import WordleCell from '../WordleCell/WordleCell'

export type WordleRowProps = {
  guess?: string
  solution: string
  isLocked?: boolean
}

const WordleRow: React.FC<WordleRowProps> = ({
  guess = '',
  isLocked,
  solution,
}) => {
  const extendedGuess = guess.padEnd(5, ' ')

  return (
    <HStack spacing="1px">
      {extendedGuess.split('').map((letter, index) => {
        const getStatus = () => {
          if (!isLocked) return 'none'
          if (letter === solution[index]) return 'correct'
          if (solution.includes(letter)) return 'misplaced'
          return 'incorrect'
        }
        return <WordleCell key={index} value={letter} status={getStatus()} />
      })}
    </HStack>
  )
}

export default WordleRow
