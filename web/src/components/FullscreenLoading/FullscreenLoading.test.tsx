import { render } from '@redwoodjs/testing/web'

import FullscreenLoading from './FullscreenLoading'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FullscreenLoading', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FullscreenLoading />)
    }).not.toThrow()
  })
})
