// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import NavSidebar from './NavSidebar'

const meta: Meta<typeof NavSidebar> = {
  component: NavSidebar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NavSidebar>

export const Primary: Story = {}
