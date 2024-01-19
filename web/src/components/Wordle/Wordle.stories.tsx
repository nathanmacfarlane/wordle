import type { Meta } from '@storybook/react'

import WordleProvider from '../WordleProvider/WordleProvider'

import Wordle from './Wordle'

const meta: Meta<typeof Wordle> = {
  component: Wordle,
  tags: ['autodocs'],
}

export default meta

export const Primary = () => {
  return (
    <WordleProvider>
      <Wordle />
    </WordleProvider>
  )
}
