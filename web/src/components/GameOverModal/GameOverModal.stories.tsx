import type { Meta } from '@storybook/react'

import WordleProvider from '../WordleProvider/WordleProvider'

import GameOverModal from './GameOverModal'

const meta: Meta<typeof GameOverModal> = {
  component: GameOverModal,
  tags: ['autodocs'],
}

export default meta

export const Primary = () => {
  return (
    <WordleProvider>
      <GameOverModal />
    </WordleProvider>
  )
}
