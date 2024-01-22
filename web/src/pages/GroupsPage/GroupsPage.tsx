import { Metadata } from '@redwoodjs/web'

import GroupsCell from 'src/components/GroupsCell'

const GroupsPage = () => {
  return (
    <>
      <Metadata title="Leagues" description="Groups page" />

      <GroupsCell />
    </>
  )
}

export default GroupsPage
