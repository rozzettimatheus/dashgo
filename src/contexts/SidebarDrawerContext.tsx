import { createContext, ReactNode, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'

interface SidebarDrawerProviderProps {
  children: ReactNode
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext<SidebarDrawerContextData>(
  {} as SidebarDrawerContextData
)

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure()
  const { asPath } = useRouter()

  useEffect(() => {
    // on route change, close drawer
    disclosure.onClose()
    // don't include disclosure to useEffect dependencies (unexpected behavior)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
