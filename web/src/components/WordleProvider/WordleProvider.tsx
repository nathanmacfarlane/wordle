import { PropsWithChildren, useState } from 'react'

import { WordleContext } from './WordleContext'

export type WordleProviderProps = {}

const WordleProvider: React.FC<PropsWithChildren<WordleProviderProps>> = ({
  children,
}) => {
  const [guesses, setGuesses] = useState<{ word: string }[]>([])
  const [solution, setSolution] = useState<string>('')

  return (
    <WordleContext.Provider
      value={{ guesses, setGuesses, solution, setSolution }}
    >
      {children}
    </WordleContext.Provider>
  )
}

export default WordleProvider
