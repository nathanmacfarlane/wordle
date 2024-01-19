import type { Meta } from '@storybook/react'

import { WordleContext } from '../WordleProvider/WordleContext'

import Wordle from './Wordle'

const meta: Meta<typeof Wordle> = {
  component: Wordle,
  tags: ['autodocs'],
}

export default meta

export const Primary = () => {
  return (
    <WordleContext.Provider
      value={{
        guesses: [
          { word: 'slate', isLocked: true },
          { word: 'style', isLocked: true },
          { word: 'stol' },
        ],
        setGuesses: () => {},
        solution: 'stole',
        setSolution: () => {},
      }}
    >
      <Wordle />
    </WordleContext.Provider>
  )
}
