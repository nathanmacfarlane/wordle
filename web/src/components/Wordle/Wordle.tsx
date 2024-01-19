import { VStack } from '@chakra-ui/react'

import { padEnd } from 'src/utils/array'

import { useWordleContext } from '../WordleProvider/WordleContext'
import WordleRow from '../WordleRow/WordleRow'

const Wordle = () => {
  const solution = 'stole'

  const { guesses } = useWordleContext()

  const extendedGuesses = padEnd(guesses, 6, '')

  return (
    <VStack w="auto">
      {extendedGuesses.map(({ word, isLocked }, index) => (
        <WordleRow
          key={index}
          guess={word}
          solution={solution}
          isLocked={isLocked}
        />
      ))}
    </VStack>
  )
}

export default Wordle
