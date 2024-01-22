import { Metadata } from '@redwoodjs/web'

import GroupCell from 'src/components/GroupCell'

export type GroupPageProps = {
  id: string
}

const GroupPage: React.FC<GroupPageProps> = ({ id }) => {
  return (
    <>
      <Metadata title="League" description="League page" />

      <GroupCell id={id} />
    </>
  )
}

export default GroupPage
