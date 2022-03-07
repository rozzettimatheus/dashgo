import { useRef } from 'react'
import { Flex, Icon, Input } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export function SearchBox() {
  const searchRef = useRef<HTMLInputElement>(null)

  return (
    <Flex
      as="label"
      flex={1}
      py="4"
      px="6"
      ml="4"
      maxW={400}
      alignSelf="center"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="2"
        mr="2"
        placeholder="Search..."
        _placeholder={{ color: 'gray.400' }}
        ref={searchRef}
      />

      <Icon as={RiSearchLine} fontSize="18" />
    </Flex>
  )
}
