import { Box, HStack, Stack, Text } from '@chakra-ui/react'

import { usePagination } from '@hooks/usePagination'
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  total: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

export function Pagination({
  total,
  onPageChange,
  currentPage = 1,
  registersPerPage = 10,
}: PaginationProps) {
  const pagination = usePagination({
    currentPage,
    total,
    registersPerPage,
  })

  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>{pagination.range.from}</strong> -{' '}
        <strong>{pagination.range.to}</strong> de <strong>{total}</strong>
      </Box>
      <HStack spacing="2">
        {/* first page  */}
        {currentPage > 1 + pagination.siblingsCount && (
          <>
            <PaginationItem pageNumber={1} onPageChange={onPageChange} />

            {currentPage > 2 + pagination.siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {/* previous */}
        {pagination.previousPages.length > 0 &&
          pagination.previousPages.map(page => (
            <PaginationItem
              key={page}
              pageNumber={page}
              onPageChange={onPageChange}
            />
          ))}

        <PaginationItem
          pageNumber={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {/* next */}
        {pagination.nextPages.length > 0 &&
          pagination.nextPages.map(page => (
            <PaginationItem
              key={page}
              pageNumber={page}
              onPageChange={onPageChange}
            />
          ))}

        {/* last page  */}
        {currentPage + pagination.siblingsCount < pagination.lastPage && (
          <>
            {currentPage + 1 + pagination.siblingsCount <
              pagination.lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem
              pageNumber={pagination.lastPage}
              onPageChange={onPageChange}
            />
          </>
        )}
      </HStack>
    </Stack>
  )
}
