import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Flex, Button, Stack } from '@chakra-ui/react'

import { Input } from './Input'
import { signInFormSchema } from '../../validators/schemas/signIn.schema'

type SignInFormData = {
  email: string
  password: string
}

export function SignInForm() {
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    router.push('/dashboard')
  }

  return (
    <Flex
      as="form"
      w="100%"
      maxWidth={360}
      boxShadow="md"
      bg="gray.800"
      p="8"
      borderRadius={8}
      flexDir="column"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <Stack spacing="4" mt="4">
        <Input
          type="email"
          label="E-mail"
          error={formState.errors?.email}
          {...register('email')}
        />
        <Input
          type="password"
          label="Password"
          error={formState.errors?.password}
          {...register('password')}
        />
      </Stack>

      <Button
        type="submit"
        mt="6"
        colorScheme="purple"
        isLoading={formState.isSubmitting}
      >
        Login
      </Button>
    </Flex>
  )
}
