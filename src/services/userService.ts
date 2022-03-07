import { User } from '@models/user'

import { apiClient } from './apiClient'

export type GetUsersResponse = {
  users: User[]
  totalCount: number
}

type CreateUserParams = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await apiClient.get<GetUsersResponse>('/users', {
    params: {
      page,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map(user => ({
    ...user,
    created_at: new Date(user.created_at).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }))

  return { users, totalCount }
}

export async function createUser(data: CreateUserParams): Promise<void> {
  const user = {
    ...data,
    createdAt: new Date(),
  }

  await apiClient.post('users', { user })
}

export async function getUserById(id: string): Promise<User> {
  const response = await apiClient.get<User>(`users/${id}`)

  return response.data
}
