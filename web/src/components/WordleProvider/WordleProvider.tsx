import { PropsWithChildren, useState } from 'react'

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

  useFetchSolution({
    onCompleted: (data) => {
      if (!data.solution) return // TODO - handle this error
      setSolution(data.solution.word)
    },
  })

  return (
    <WordleContext.Provider
      value={{ guesses, setGuesses, solution, setSolution }}
    >
      {children}
    </WordleContext.Provider>
  )
}

export default WordleProvider
