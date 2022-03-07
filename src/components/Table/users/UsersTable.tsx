import {
  Checkbox,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'

import { User } from '@models/user'
import { UserRecordRow } from './UserRecordRow'

interface UsersTableProps {
  records?: User[]
}

interface UserHeaderRowProps {
  isWide?: boolean
}

function UserHeaderRow({ isWide }: UserHeaderRowProps) {
  return (
    <Tr>
      <Th px={['4', '4', '6']} color="gray.300" width="8">
        <Checkbox colorScheme="purple" />
      </Th>
      <Th>User</Th>
      {isWide && <Th>Created At</Th>}
      <Th w="8"></Th>
    </Tr>
  )
}

export function UsersTable({ records }: UsersTableProps) {
  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Table colorScheme="whiteAlpha">
      <Thead>
        <UserHeaderRow isWide={isWideScreen} />
      </Thead>
      <Tbody>
        {records?.map(record => (
          <UserRecordRow key={record.id} user={record} isWide={isWideScreen} />
        ))}
      </Tbody>
    </Table>
  )
}
