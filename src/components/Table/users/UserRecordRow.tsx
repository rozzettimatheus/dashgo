import {
  Tr,
  Td,
  Checkbox,
  Box,
  IconButton,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react'
import { RiPencilLine } from 'react-icons/ri'

import { User } from '@models/user'

interface UserRecordProps {
  user: User
  isWide?: boolean
}

export function UserRecordRow({ user, isWide }: UserRecordProps) {
  return (
    <Tr key={user.id}>
      <Td px={['4', '4', '6']} color="gray.300" width="8">
        <Checkbox colorScheme="purple" />
      </Td>
      <Td>
        <Box>
          <Link
            color="purple.400"
            // onMouseEnter={() => handlePrefetchUser(user.id)}
          >
            <Text fontWeight="bold">{user.name}</Text>
          </Link>
          <Text fontSize="sm" color="gray.300">
            {user.email}
          </Text>
        </Box>
      </Td>
      {isWide && <Td>{user.created_at}</Td>}
      <Td>
        <IconButton
          colorScheme="purple"
          icon={<Icon as={RiPencilLine} fontSize={18} />}
          aria-label="Edit User"
        />
      </Td>
    </Tr>
  )
}
