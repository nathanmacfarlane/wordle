import { render } from '@redwoodjs/testing/web'

import BoardRow from './BoardRow'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BoardRow', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BoardRow />)
    }).not.toThrow()
  })
})
