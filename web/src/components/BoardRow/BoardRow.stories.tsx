import { useState } from 'react'

import { Button, HStack, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { BoardRow } from 'types/graphql'

import BoardRowView from './BoardRow'

const meta: Meta<typeof BoardRowView> = {
  component: BoardRowView,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof BoardRowView>

export const Primary: Story = {
  args: {
    boardRow: {
      cells: [
        { letter: 'A', status: 'CORRECT' },
        { letter: 'B', status: 'CORRECT' },
        { letter: 'C', status: 'CORRECT' },
        { letter: 'D', status: 'CORRECT' },
        { letter: 'E', status: 'CORRECT' },
      ],
    },
  },
}

const EMPTY_CELLS: BoardRow = {
  cells: [
    { status: 'EMPTY' },
    { status: 'EMPTY' },
    { status: 'EMPTY' },
    { status: 'EMPTY' },
    { status: 'EMPTY' },
  ],
}

export const TilesFlipping = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [cells, setCells] = useState<BoardRow>(EMPTY_CELLS)

  const handleAddLetter = () => {
    const emptyCell = cells.cells.findIndex((cell) => !cell.letter)
    if (emptyCell === -1) return

    setCells((prev) => {
      const newCells = [...prev.cells]
      // create a random letter
      const randomLetter = String.fromCharCode(
        Math.floor(Math.random() * 26) + 65
      )
      newCells[emptyCell].letter = randomLetter
      return { cells: newCells }
    })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCells((prev) => {
        const newCells = [...prev.cells]
        newCells.forEach((cell) => {
          const randomStatus =
            Math.random() > 0.2
              ? 'CORRECT'
              : Math.random() > 0.6
              ? 'MISPLACED'
              : 'INCORRECT'
          cell.status = randomStatus
        })
        return { cells: newCells }
      })
      setIsLoading(false)
    }, 1_000)
  }

  return (
    <VStack>
      <HStack>
        <Button onClick={handleAddLetter}>Add Letter</Button>
        <Button isLoading={isLoading} onClick={handleSubmit}>
          Submit
        </Button>
      </HStack>
      <BoardRowView boardRow={cells} />
    </VStack>
  )
}
