import { Metadata } from '@redwoodjs/web'

import BoardCell from 'src/components/BoardCell'

const TodayPage = () => {
  const todayString = new Date().toISOString().split('T')[0]
  return (
    <>
      <Metadata title="Today" description="Today page" />

      <BoardCell date={todayString} />
    </>
  )
}

export default TodayPage
