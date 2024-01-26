import { Metadata } from '@redwoodjs/web'

import HistoryCell from 'src/components/HistoryCell'

const HistoryPage = () => {
  return (
    <>
      <Metadata title="History" description="History page" />

      <HistoryCell />
    </>
  )
}

export default HistoryPage
