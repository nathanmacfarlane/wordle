import { VStack } from '@chakra-ui/react'

import { useCreateGuess } from 'src/requests/useCreateGuess'
import { padEnd } from 'src/utils/array'

import VirtualKeyboard from '../VirtualKeyboard/VirtualKeyboard'
import { useWordleContext } from '../WordleProvider/WordleContext'
import WordleRow from '../WordleRow/WordleRow'

const Wordle = () => {
  const { solution, guesses, setGuesses } = useWordleContext()

  const extendedGuesses = padEnd(guesses, 6, '')

  const [createGuess] = useCreateGuess()

  const handleKeyPress = (key: string) => {
    const activeGuess = extendedGuesses.find(({ isLocked }) => !isLocked)

    const addLetterToGuess = (additionalLetter: string) => {
      const { word } = activeGuess || { word: '' }
      if (word.length >= 5) {
        // word is already 5 letters
        return
      }
      const newWord = word + additionalLetter
      const prevGuesses = guesses.filter(({ isLocked }) => isLocked)
      const newGuesses = [...prevGuesses, { word: newWord }]
      setGuesses(newGuesses)
    }

    const removeLetterFromGuess = () => {
      if (!activeGuess || activeGuess.word.length === 0) return
      const { word } = activeGuess

      const newWord = word.slice(0, word.length - 1)
      const prevGuesses = guesses.filter(({ isLocked }) => isLocked)
      const newGuesses = [...prevGuesses, { word: newWord }]
      setGuesses(newGuesses)
    }

    const handleSubmitGuess = () => {
      if (!activeGuess) return
      const { word } = activeGuess
      if (word.length !== 5) return
      const prevGuesses = guesses.filter(({ isLocked }) => isLocked)
      const newGuesses = [...prevGuesses, { word, isLocked: true }]
      setGuesses(newGuesses)
      createGuess({ variables: { input: { word } } })
    }

    if (key === 'ENTER') {
      handleSubmitGuess()
    } else if (key === 'delete') {
      removeLetterFromGuess()
    } else {
      addLetterToGuess(key.toLowerCase())
    }
  }

  return (
    <VStack w="auto">
      <VStack spacing={1}>
        {extendedGuesses.map(({ word, isLocked }, index) => (
          <WordleRow
            key={index}
            guess={word}
            solution={solution}
            isLocked={isLocked}
          />
        ))}
      </VStack>
      <VirtualKeyboard onPress={handleKeyPress} />
    </VStack>
  )
}

export default Wordle
