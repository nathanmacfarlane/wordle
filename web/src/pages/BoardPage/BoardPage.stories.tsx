import type { Meta, StoryObj } from '@storybook/react'

import BoardPage from './BoardPage'

const meta: Meta<typeof BoardPage> = {
  component: BoardPage,
}

export default meta

type Story = StoryObj<typeof BoardPage>

export const Primary: Story = {}
