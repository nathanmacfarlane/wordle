import { useEffect, useState } from 'react'

import { HStack } from '@chakra-ui/react'
import { BoardRow } from 'types/graphql'

import WordleCell from '../WordleCell/WordleCell'

export type BoardRowProps = {
  boardRow: BoardRow
  size?: 'sm' | 'default'
}

const BoardRowView: React.FC<BoardRowProps> = ({ boardRow, size }) => {
  const [flippingIndices, setFlippingIndices] = useState<number[]>([])

  useEffect(() => {
    // Filter the indices of cells with a status change from EMPTY to anything other than EMPTY
    const changedIndices = boardRow.cells
      .map((cell, index) => (cell.status !== 'EMPTY' ? index : null))
      .filter((index) => index !== null) as number[]

    // Trigger the flipping animation sequentially
    changedIndices.forEach((index, i) => {
      setTimeout(() => {
        setFlippingIndices((prevIndices) => [...prevIndices, index])
      }, i * 200) // Adjust the delay as needed
    })
  }, [boardRow.cells])

  return (
    <HStack spacing="1px">
      {boardRow.cells.map((cell, index) => {
        return (
          <WordleCell
            key={index}
            value={cell.letter || undefined}
            status={cell.status}
            size={size}
            triggerFlip={flippingIndices.includes(index)}
          />
        )
      })}
    </HStack>
  )
}

export default BoardRowView
