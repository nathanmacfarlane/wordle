import { Metadata } from '@redwoodjs/web'

import ProfileCell from 'src/components/ProfileCell'

export type ProfilePageProps = {
  id: string
}

const ProfilePage: React.FC<ProfilePageProps> = ({ id }) => {
  return (
    <>
      <Metadata title="Profile" description="Profile page" />

      <ProfileCell id={id} />
    </>
  )
}

export default ProfilePage
