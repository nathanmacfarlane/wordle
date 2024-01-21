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
  gameStatus: 'won' | 'lost' | 'playing'
}

export const WordleContext = createContext<WordleContextType>({
  solution: '',
  guesses: [],
  loadingGuesses: false,
  setSolution: () => {},
  setGuesses: () => {},
  gameStatus: 'playing',
})

export const useWordleContext = () => {
  return useContext(WordleContext)
}
