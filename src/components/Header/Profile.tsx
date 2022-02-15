import { Flex, Box, Avatar, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gabriel Rozzetti</Text>
          <Text color="gray.300" fontSize="small">
            gabriel@email.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Gabriel Rozzetti" />
    </Flex>
  )
}
