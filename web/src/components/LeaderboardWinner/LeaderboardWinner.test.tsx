import { render } from '@redwoodjs/testing/web'

import LeaderboardWinner from './LeaderboardWinner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LeaderboardWinner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LeaderboardWinner />)
    }).not.toThrow()
  })
})
