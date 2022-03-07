import { useQuery } from 'react-query'

import { getUsers, GetUsersResponse } from '@services/userService'

/**
 * a key continua sendo a mesma mesmo se trocar de pagina, precisa deixar único
 *
 *- chave composta - pode ser array, objeto ['users', { page }]
 */
export function useUsers(page: number, options?: object) {
  return useQuery<GetUsersResponse>(
    // key a ser armazenada nos cookies
    ['users', page],
    () => getUsers(page),
    {
      // tempo que o dado está fresh
      staleTime: 1000 * 10, // 5s
      ...options,
    }
  )
}
