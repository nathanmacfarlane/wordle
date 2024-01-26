import { HStack } from '@chakra-ui/react'
import { BoardRow } from 'types/graphql'

import WordleCell from '../WordleCell/WordleCell'

export type BoardRowProps = {
  boardRow: BoardRow
  size?: 'sm' | 'default'
}

const BoardRowView: React.FC<BoardRowProps> = ({ boardRow, size }) => {
  return (
    <HStack spacing="1px">
      {boardRow.cells.map((cell, index) => {
        return (
          <WordleCell
            key={index}
            value={cell.letter || undefined}
            status={cell.status}
            size={size}
          />
        )
      })}
    </HStack>
  )
}

export default BoardRowView
