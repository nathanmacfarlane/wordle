import { useMemo } from 'react'

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
  const extendedGuess = useMemo(() => {
    return guess.padEnd(5, ' ').split('')
  }, [guess])

  return (
    <HStack spacing="1px">
      {extendedGuess.map((letter, index) => {
        const getStatus = () => {
          if (!isLocked) return 'none'
          if (letter === solution[index]) return 'correct'
          if (solution.includes(letter)) {
            // all indexes of letter in solution
            const indexes = solution
              .split('')
              .map((l, i) => (l === letter ? i : null))
              .filter((i) => i !== null) as number[]
            // if any of the indexes are not correct, then this letter should be marked as misplaced
            const isMisplaced = indexes.some((i) => guess[i] !== solution[i])
            if (isMisplaced) return 'misplaced'
          }
          return 'incorrect'
        }
        return <WordleCell key={index} value={letter} status={getStatus()} />
      })}
    </HStack>
  )
}

export default WordleRow
