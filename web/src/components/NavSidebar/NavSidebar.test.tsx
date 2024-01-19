import { render } from '@redwoodjs/testing/web'

import NavSidebar from './NavSidebar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavSidebar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavSidebar />)
    }).not.toThrow()
  })
})
