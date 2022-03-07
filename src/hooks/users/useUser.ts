import { getUserById } from '@services/userService'
import { useQuery } from 'react-query'
import { User } from '@models/user'

export function useUser(id: string) {
  return useQuery<User>(['user', id], () => getUserById(id))
}
