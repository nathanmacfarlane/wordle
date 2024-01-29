import { render } from '@redwoodjs/testing/web'

import LeaderboardWinners from './LeaderboardWinners'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LeaderboardWinners', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LeaderboardWinners />)
    }).not.toThrow()
  })
})
