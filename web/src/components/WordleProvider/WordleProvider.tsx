import { PropsWithChildren, useState } from 'react'

import { useFetchGuesses } from 'src/requests/useFetchGuesses'
import { useFetchSolution } from 'src/requests/useFetchSolution'

import { WordleContext } from './WordleContext'

export type WordleProviderProps = {}

const WordleProvider: React.FC<PropsWithChildren<WordleProviderProps>> = ({
  children,
}) => {
  const [guesses, setGuesses] = useState<
    { word: string; isLocked?: boolean }[]
  >([])
  const [solution, setSolution] = useState<string>('')
  const { loading: loadingGuesses } = useFetchGuesses({
    variables: {},
    onCompleted: (data) => {
      if (!data.guesses) return
      setGuesses(
        data.guesses.map((guess) => ({
          word: guess.word,
          isLocked: true,
        }))
      )
    },
  })

  useFetchSolution({
    onCompleted: (data) => {
      if (!data.solution) return // TODO - handle this error
      setSolution(data.solution.word)
    },
  })

  return (
    <WordleContext.Provider
      value={{ guesses, setGuesses, solution, setSolution, loadingGuesses }}
    >
      {children}
    </WordleContext.Provider>
  )
}

export default WordleProvider
