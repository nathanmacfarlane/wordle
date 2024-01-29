import { render } from '@redwoodjs/testing/web'

import HallOfFamePage from './HallOfFamePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HallOfFamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HallOfFamePage />)
    }).not.toThrow()
  })
})
