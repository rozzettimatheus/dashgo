import { forwardRef, ForwardRefRenderFunction } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

/**
 * nunca pode passar a ref como props
 *
 * - precisa usar useForwardRef
 *  - transformar o component em uma constante
 * - usar o component exportado com forwardRef em volta
 * - receber a ref como segundo parametro do componentBase
 */

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError
}

// ref prop input , props type
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, type, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        type={type}
        focusBorderColor="purple.500"
        bgColor="gray.900"
        variant="filled"
        size="md"
        _hover={{
          bgColor: 'gray.900',
        }}
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
