import { HStack } from '@chakra-ui/react'
import { BoardRow } from 'types/graphql'

import WordleCell from '../WordleCell/WordleCell'

export type BoardRowProps = {
  boardRow: BoardRow
}

const BoardRowView: React.FC<BoardRowProps> = ({ boardRow }) => {
  return (
    <HStack spacing="1px">
      {boardRow.cells.map((cell, index) => {
        return (
          <WordleCell
            key={index}
            value={cell.letter || undefined}
            status={cell.status}
          />
        )
      })}
    </HStack>
  )
}

export default BoardRowView
