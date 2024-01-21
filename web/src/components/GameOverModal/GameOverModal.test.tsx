import { render } from '@redwoodjs/testing/web'

import WordleProvider from '../WordleProvider/WordleProvider'

import GameOverModal from './GameOverModal'

describe('GameOverModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <WordleProvider>
          <GameOverModal />
        </WordleProvider>
      )
    }).not.toThrow()
  })
})
