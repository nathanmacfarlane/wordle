import { Metadata } from '@redwoodjs/web'

import BoardCell from 'src/components/BoardCell'
import { getLocalDateIsoString } from 'src/utils/getLocalDate'

const TodayPage = () => {
  const todayString = getLocalDateIsoString()
  return (
    <>
      <Metadata title="Today" description="Today page" />

      <BoardCell date={todayString} />
    </>
  )
}

export default TodayPage
