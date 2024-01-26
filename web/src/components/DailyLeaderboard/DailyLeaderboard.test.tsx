import { render } from '@redwoodjs/testing/web'

import DailyLeaderboard from './DailyLeaderboard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DailyLeaderboard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DailyLeaderboard />)
    }).not.toThrow()
  })
})
