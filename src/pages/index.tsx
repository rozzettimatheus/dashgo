import { Flex, Box } from '@chakra-ui/react'

import { SignInForm } from '../components/Form/SignInForm'
import { Logo } from '../components/Header/Logo'

export default function SignIn() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex flex={2} align="center" justify="center">
        <Box textAlign="end">
          <Logo hasSlogan />
        </Box>
      </Flex>

      <Flex
        h="100%"
        flex={1}
        bgGradient="linear(to-br, purple.600, blue.300)"
        align="center"
        justify="center"
      >
        <SignInForm />
      </Flex>
    </Flex>
  )
}
