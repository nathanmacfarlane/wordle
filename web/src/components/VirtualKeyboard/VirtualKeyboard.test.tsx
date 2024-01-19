import { render } from '@redwoodjs/testing/web'

import VirtualKeyboard from './VirtualKeyboard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VirtualKeyboard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VirtualKeyboard />)
    }).not.toThrow()
  })
})
