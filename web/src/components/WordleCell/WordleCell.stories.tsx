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

import WordleCell from './WordleCell'

const meta: Meta<typeof WordleCell> = {
  component: WordleCell,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof WordleCell>

export const Primary: Story = {}
