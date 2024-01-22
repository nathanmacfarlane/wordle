import { render } from '@redwoodjs/testing/web'

import TodayPage from './TodayPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TodayPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TodayPage />)
    }).not.toThrow()
  })
})
