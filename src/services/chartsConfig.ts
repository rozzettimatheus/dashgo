import { theme } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'

export const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray['500'],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    colors: [theme.colors.purple[500]],
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-02-07T00:00:00.000Z',
      '2021-02-08T00:00:00.000Z',
      '2021-02-09T00:00:00.000Z',
      '2021-02-10T00:00:00.000Z',
      '2021-02-11T00:00:00.000Z',
      '2021-02-12T00:00:00.000Z',
      '2021-02-13T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
    colors: [theme.colors.purple[500]],
  },
}

export const series = [
  {
    name: 'series1',
    data: [31, 120, 10, 28, 61, 18, 109],
  },
]
