import { render } from '@redwoodjs/testing/web'

import NavTabs from './NavTabs'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavTabs', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavTabs />)
    }).not.toThrow()
  })
})
