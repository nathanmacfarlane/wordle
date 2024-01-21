import { Metadata } from '@redwoodjs/web'

import GroupCell from 'src/components/GroupCell'

export type GroupPageProps = {
  id: string
}

const GroupPage: React.FC<GroupPageProps> = ({ id }) => {
  return (
    <>
      <Metadata title="Group" description="Group page" />

      <GroupCell id={id} />
    </>
  )
}

export default GroupPage
