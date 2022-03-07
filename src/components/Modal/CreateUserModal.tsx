import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  SimpleGrid,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '@components/Form/Input'
import { useCreateUser } from '@hooks/users/useCreateUser'
import { createUserFormSchema } from '@validators/schemas/createUser.schema'

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
}

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const { formState, register, handleSubmit } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  })

  const toast = useToast()

  const { mutateAsync } = useCreateUser({
    onEnded: onClose,
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values,
    event
  ) => {
    try {
      await mutateAsync(values)

      toast({
        title: 'Success',
        description: 'User created with success',
        duration: 3 * 1000, // 3s
        status: 'success',
      })
    } catch (err: any) {
      const { errors } = JSON.parse(err.request.response)

      toast({
        title: 'Error adding user',
        description: errors,
        duration: 3 * 1000, // 3s
        status: 'error',
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent
        as="form"
        bg="gray.800"
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <ModalHeader>Create new user</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={['6', '8']}>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('name')}
                label="Fullname"
                error={formState.errors?.name}
              />
              <Input
                {...register('email')}
                label="E-mail"
                type="email"
                error={formState.errors?.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('password')}
                type="password"
                label="Password"
                error={formState.errors?.password}
              />
              <Input
                {...register('password_confirmation')}
                type="password"
                label="Password Confirmation"
                error={formState.errors?.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button onClick={onClose} colorScheme="whiteAlpha" variant="ghost">
              Cancel
            </Button>
            <Button
              isLoading={formState.isSubmitting}
              colorScheme="purple"
              type="submit"
            >
              Save
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
