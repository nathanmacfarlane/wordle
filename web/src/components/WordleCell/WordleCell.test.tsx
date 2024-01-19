import { render } from '@redwoodjs/testing/web'

import WordleCell from './WordleCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WordleCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WordleCell />)
    }).not.toThrow()
  })
})
