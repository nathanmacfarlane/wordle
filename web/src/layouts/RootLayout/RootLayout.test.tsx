import { render } from '@redwoodjs/testing/web'

import RootLayout from './RootLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RootLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RootLayout />)
    }).not.toThrow()
  })
})
