const generatePagesArray = (from: number, to: number) =>
  [...new Array(to - from)].map((_, i) => from + i + 1).filter(page => page > 0)

type Range = {
  from: number
  to: number
}

export type UsePaginationArgs = {
  currentPage: number
  total: number
  registersPerPage: number
  siblingsCount?: number
}

export type UsePaginationReturn = {
  lastPage: number
  previousPages: number[]
  nextPages: number[]
  siblingsCount: number
  range: Range
}

export function usePagination({
  currentPage,
  total,
  registersPerPage,
  siblingsCount = 1,
}: UsePaginationArgs): UsePaginationReturn {
  const lastPage = Math.ceil(total / registersPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  return {
    lastPage,
    previousPages,
    nextPages,
    siblingsCount,
    range: {
      from: (currentPage - 1) * registersPerPage + 1,
      to: currentPage * registersPerPage,
    },
  }
}
