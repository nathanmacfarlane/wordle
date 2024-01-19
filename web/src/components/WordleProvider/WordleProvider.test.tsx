import { render } from '@redwoodjs/testing/web'

import WordleProvider from './WordleProvider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WordleProvider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WordleProvider />)
    }).not.toThrow()
  })
})
