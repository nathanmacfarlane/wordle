import { Center, Image, Text, VStack, keyframes } from '@chakra-ui/react'

const spin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg)}
`

const FullscreenLoading = () => {
  const spinAnimation = `${spin} infinite 1s linear`
  return (
    <Center w="full" h="100vh">
      <VStack alignItems="center">
        <Text>Nate will probably win today</Text>
        <Image
          src="nate.jpg"
          w="50"
          h="50"
          rounded="full"
          animation={spinAnimation}
        />
      </VStack>
    </Center>
  )
}

export default FullscreenLoading
