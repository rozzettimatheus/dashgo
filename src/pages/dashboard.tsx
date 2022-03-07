import dynamic from 'next/dynamic'
import { Box, Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react'

import { Header } from '@components/Header'
import { Sidebar } from '@components/Sidebar'
import { options, series } from '@services/chartsConfig'

const Chart = dynamic(() => import('react-apexcharts'), {
  loading: () => (
    <Flex justify="center">
      <Spinner color="purple.500" />
    </Flex>
  ),
  ssr: false,
})

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth={320}
          alignItems="flex-start"
        >
          <Box p={['4', '6', '8']} pb="4" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Weekly Subscribers
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p={['4', '6', '8']} pb="4" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Opening Rate
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
