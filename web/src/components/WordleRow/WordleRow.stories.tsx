import type { Meta, StoryObj } from '@storybook/react'

import WordleRow from './WordleRow'

const meta: Meta<typeof WordleRow> = {
  component: WordleRow,
  tags: ['autodocs'],
  args: {
    solution: 'stole',
    guess: 'slate',
    isLocked: true,
  },
}

export default meta

type Story = StoryObj<typeof WordleRow>

export const Primary: Story = {}
