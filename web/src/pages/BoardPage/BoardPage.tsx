import { Metadata } from '@redwoodjs/web'

import BoardCell from 'src/components/BoardCell'

export type BoardPageProps = {
  date: string
}

const BoardPage: React.FC<BoardPageProps> = ({ date }) => {
  console.log('date: ', date)
  return (
    <>
      <Metadata title="Board" description="Board page" />

      <BoardCell date={date} />
    </>
  )
}

export default BoardPage
