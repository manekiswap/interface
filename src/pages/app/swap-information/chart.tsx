import { Flex, Label, Text } from '@theme-ui/components';
import { ApexOptions } from 'apexcharts';
import ApexCharts from 'react-apexcharts';

import Radio from '../../../components/radios/radio';

export default function Chart() {
  const series = [
    {
      name: 'Exchange inflow / outflow',
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8],
    },
    {
      name: 'Decentralized exchanges (total volume)',
      data: [20, 29, 37, 36, 44, 45, 50],
    },
  ];

  const options: ApexOptions = {
    chart: {
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      fontFamily:
        '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    },
    colors: ['#84B3FF', '#FAC155'],
    stroke: {
      width: [2, 2],
    },
    xaxis: {
      categories: ['Sep 27', 'Sep 28', 'Sep 29', 'Sep 30', 'Oct 01', 'Oct 02', 'Oct 03'],
      crosshairs: {
        show: true,
      },
    },
    markers: {
      shape: 'square',
    },
    yaxis: [
      {
        opposite: true,
        crosshairs: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
          color: '#84B3FF',
        },
        labels: {
          style: {
            colors: '#84B3FF',
          },
          formatter: function (value) {
            return '$' + value;
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
          color: '#FAC155',
        },
        labels: {
          style: {
            colors: '#FAC155',
          },
        },
      },
    ],
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      strokeDashArray: 5,
      borderColor: '#424141a7',
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      formatter: function (seriesName, opts) {
        return `
          <span style="color: red;">${seriesName}</span>
        `;
      },
    },
  };

  return (
    <Flex
      sx={{
        flexDirection: 'column',
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          alignSelf: 'flex-start',
          width: '100%',
          bg: 'dark.500',
          border: '1px solid #555572',
          borderRadius: 'lg',
        }}
      >
        <ApexCharts options={options} series={series} type="line" height={350} />
      </Flex>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 12, color: 'dark.200' }}>
        <Flex>
          <Label sx={{ alignItems: 'center', width: 'auto', flexShrink: 0, marginRight: 18 }}>
            <Radio name="time" defaultChecked={true} sx={{ marginRight: 14 }} />
            <Text variant="caps200">24 hours</Text>
          </Label>
          <Label sx={{ alignItems: 'center', width: 'auto', flexShrink: 0, marginRight: 18 }}>
            <Radio name="time" sx={{ marginRight: 14 }} />
            <Text variant="caps200">Last 7 days</Text>
          </Label>
          <Label sx={{ alignItems: 'center', width: 'auto', flexShrink: 0 }}>
            <Radio name="time" sx={{ marginRight: 14 }} />
            <Text variant="caps200">Last 30 days</Text>
          </Label>
        </Flex>
        <Flex>
          <Text variant="caps200">Style: Line</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
