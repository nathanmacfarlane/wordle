import { render } from '@redwoodjs/testing/web'

import VirtualKeyboardKey from './VirtualKeyboardKey'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VirtualKeyboardKey', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VirtualKeyboardKey />)
    }).not.toThrow()
  })
})
