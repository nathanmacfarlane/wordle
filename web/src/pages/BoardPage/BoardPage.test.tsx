import { render } from '@redwoodjs/testing/web'

import BoardPage from './BoardPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BoardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BoardPage />)
    }).not.toThrow()
  })
})
