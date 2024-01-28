import { Metadata } from '@redwoodjs/web'

import ProfileCell from 'src/components/ProfileCell'

const ProfilePage = () => {
  return (
    <>
      <Metadata title="Profile" description="Profile page" />

      <ProfileCell />
    </>
  )
}

export default ProfilePage
