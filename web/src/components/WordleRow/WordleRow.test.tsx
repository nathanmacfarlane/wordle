import { render } from '@redwoodjs/testing/web'

import WordleRow from './WordleRow'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WordleRow', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WordleRow />)
    }).not.toThrow()
  })
})
