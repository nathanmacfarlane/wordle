import type { Meta, StoryObj } from '@storybook/react'

import LeaderboardWinner from './LeaderboardWinner'

const meta: Meta<typeof LeaderboardWinner> = {
  component: LeaderboardWinner,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LeaderboardWinner>

export const FirstPlace: Story = {
  args: {
    place: 1,
    name: 'Nathan',
    imageUrl: 'https://avatars.githubusercontent.com/u/263385',
    score: 2.9,
  },
}

export const SecondPlace: Story = {
  args: {
    place: 2,
    name: 'Nathan',
    imageUrl: 'https://avatars.githubusercontent.com/u/263385',
    score: 2.9,
  },
}

export const ThirdPlace: Story = {
  args: {
    place: 3,
    name: 'Nathan',
    imageUrl: 'https://avatars.githubusercontent.com/u/263385',
    score: 2.9,
  },
}
