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

import NavTabs from './NavTabs'

const meta: Meta<typeof NavTabs> = {
  component: NavTabs,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NavTabs>

export const Primary: Story = {}
