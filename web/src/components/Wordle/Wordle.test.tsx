import { render } from '@redwoodjs/testing/web'

import Wordle from './Wordle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Wordle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Wordle />)
    }).not.toThrow()
  })
})
