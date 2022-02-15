import { Text } from '@chakra-ui/react'

export function Logo() {
  return (
    <Text
      as="span"
      display="inline-block"
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      w={['56', '64']}
    >
      dash
      <Text as="span" mx="1" color="purple.500">
        .
      </Text>
      go
    </Text>
  )
}
