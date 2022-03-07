import { useMutation } from 'react-query'

import { createUser } from '@services/userService'
import { queryClient } from '@services/queryClient'

interface UseCreateUserArgs {
  onSuccess?: () => void
  onFailure?: () => void
  onEnded?: () => void
}

export function useCreateUser({
  onSuccess,
  onFailure,
  onEnded,
}: UseCreateUserArgs) {
  return useMutation(createUser, {
    // retry: 3,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])

      onSuccess?.()
    },
    onSettled: () => {
      onEnded?.()
    },
  })
}
