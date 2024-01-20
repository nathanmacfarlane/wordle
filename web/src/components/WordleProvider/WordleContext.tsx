import { createContext, useContext } from 'react'

export type WordleContextType = {
  solution: string
  loadingGuesses: boolean
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
  loadingGuesses: false,
  setSolution: () => {},
  setGuesses: () => {},
})

export const useWordleContext = () => {
  return useContext(WordleContext)
}
