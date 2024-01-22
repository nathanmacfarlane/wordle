import type { Meta, StoryObj } from '@storybook/react'

import TodayPage from './TodayPage'

const meta: Meta<typeof TodayPage> = {
  component: TodayPage,
}

export default meta

type Story = StoryObj<typeof TodayPage>

export const Primary: Story = {}
