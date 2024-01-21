import { Metadata } from '@redwoodjs/web'

import GroupsCell from 'src/components/GroupsCell'

const GroupsPage = () => {
  return (
    <>
      <Metadata title="Groups" description="Groups page" />

      <GroupsCell />
    </>
  )
}

export default GroupsPage
