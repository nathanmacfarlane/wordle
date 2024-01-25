import { Metadata } from '@redwoodjs/web'

import LeaderboardCell from 'src/components/LeaderboardCell'

const LeaderboardPage = () => {
  return (
    <>
      <Metadata title="Leaderboard" description="Leaderboard page" />

      <LeaderboardCell />
    </>
  )
}

export default LeaderboardPage
