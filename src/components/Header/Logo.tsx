import { Text, TextProps } from '@chakra-ui/react'

interface LogoProps {
  hasSlogan?: boolean
}

export function Logo({ hasSlogan }: LogoProps) {
  return (
    <>
      <Text
        as="span"
        display="inline-block"
        fontSize={hasSlogan ? '6xl' : ['2xl', '3xl']}
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
      {hasSlogan && (
        <Text as="span" fontSize="sm" display="block" color="gray.600" mt="1">
          For developers
        </Text>
      )}
    </>
  )
}
