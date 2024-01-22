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

import HomeHeader from './HomeHeader'

const meta: Meta<typeof HomeHeader> = {
  component: HomeHeader,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof HomeHeader>

export const Primary: Story = {}
