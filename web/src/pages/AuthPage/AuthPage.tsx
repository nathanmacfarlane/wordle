import { Center } from '@chakra-ui/react'
import { SignIn } from '@clerk/clerk-react'

import { Metadata } from '@redwoodjs/web'

const AuthPage = () => {
  return (
    <>
      <Metadata title="Auth" description="Auth page" />

      <Center width="100%" height="100vh">
        <SignIn />
      </Center>
    </>
  )
}

export default AuthPage
