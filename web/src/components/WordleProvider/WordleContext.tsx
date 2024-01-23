import { createContext, useContext } from 'react'

import { Solution } from 'types/graphql'

export type WordleContextType = {
  solution: Solution
  loadingGuesses: boolean
  guesses: {
    word: string
    isLocked?: boolean
  }[]
  setGuesses: (guesses: { word: string }[]) => void
  setSolution: (solution: Solution) => void
  gameStatus: 'won' | 'lost' | 'playing'
}

export const WordleContext = createContext<WordleContextType>({
  solution: { word: '', date: '', id: -1 },
  guesses: [],
  loadingGuesses: false,
  setSolution: () => {},
  setGuesses: () => {},
  gameStatus: 'playing',
})

export const useWordleContext = () => {
  return useContext(WordleContext)
}
