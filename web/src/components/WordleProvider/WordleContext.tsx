import { createContext, useContext } from 'react'

export type WordleContextType = {
  solution: string
  guesses: {
    word: string
    isLocked?: boolean
  }[]
  setGuesses: (guesses: { word: string }[]) => void
  setSolution: (solution: string) => void
}

export const WordleContext = createContext<WordleContextType>({
  solution: '',
  guesses: [],
  setSolution: () => {},
  setGuesses: () => {},
})

export const useWordleContext = () => {
  return useContext(WordleContext)
}
