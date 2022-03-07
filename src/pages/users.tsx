import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { RiAddLine } from 'react-icons/ri'

import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { Sidebar } from '../components/Sidebar'
import { CreateUserModal } from '../components/Modal/CreateUserModal'
import { useState } from 'react'
import { apiClient } from '../services/apiClient'
import { User, useUsers } from '../hooks/users/useUsers'
import { queryClient } from '../services/queryClient'
import { GetServerSideProps } from 'next'
import { UsersTable } from '../components/Table/users/UsersTable'

/**
 *
 * stale-while-revalidate
 * - react query mostra a mais atual no cache, por baixo dos panos vai revalidar
 *
 * - mesmo que pinar a tab, o react query atualiza automaticamente
 * - revalidate on focus
 *
 * - devtools
 *
 * - 2 loaders
 * - inicial (mais pesado)
 * - refetch (mais discreto)
 *
 *
 * mutations
 * - criar, alterar ou deletar dados
 */
interface UserListProps {
  users: User[]
}

export default function UserList({ users }: UserListProps) {
  const [page, setPage] = useState(1)
  const { data, isLoading, error, isFetching, refetch } = useUsers(page)

  const { isOpen, onClose, onOpen } = useDisclosure()

  async function handlePrefetchUser(id: string) {
    // 1 cache de dados pra cada usuario
    await queryClient.prefetchQuery(
      ['user', id],
      async () => {
        const response = await apiClient.get(`users/${id}`)

        return response.data
      },
      {
        staleTime: 1000 * 60 * 10, // 10min
      }
    )
  }

  return (
    <>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Users
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="gray.500" ml="4" />
                )}
              </Heading>

              {/* <NextLink href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="purple"
                  leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                >
                  Create
                </Button>
              </NextLink> */}

              <HStack spacing={2}>
                <Button
                  size="sm"
                  fontSize="sm"
                  colorScheme="blackAlpha"
                  bg="transparent"
                  onClick={() => refetch({})}
                >
                  Refetch data
                </Button>

                <Button
                  size="sm"
                  fontSize="sm"
                  colorScheme="purple"
                  leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                  onClick={onOpen}
                >
                  Create
                </Button>
              </HStack>
            </Flex>

            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Failed to fetch data</Text>
              </Flex>
            ) : (
              data && (
                <>
                  <UsersTable records={data.users} />

                  <Pagination
                    total={data.totalCount}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </>
              )
            )}
          </Box>
        </Flex>
      </Box>
      <CreateUserModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

// useQuery nao funciona em SSR, mas...
// da para fazer o primeiro fetch de dados e repassar como props
// initial data
export const getServerSideProps: GetServerSideProps = async () => {
  // miragejs nao funciona em ssr
  // const { users } = await getUsers(1)

  return {
    props: {
      users: [],
    },
  }
}
