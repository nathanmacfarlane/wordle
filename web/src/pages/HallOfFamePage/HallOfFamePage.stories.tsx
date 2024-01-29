import type { Meta, StoryObj } from '@storybook/react'

import HallOfFamePage from './HallOfFamePage'

const meta: Meta<typeof HallOfFamePage> = {
  component: HallOfFamePage,
}

export default meta

type Story = StoryObj<typeof HallOfFamePage>

export const Primary: Story = {}
