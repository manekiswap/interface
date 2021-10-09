import { Currency } from '@manekiswap/sdk';
import { Box, Button, Flex, FlexProps, Grid, Text } from '@theme-ui/components';
import OriginalApexCharts, { ApexOptions } from 'apexcharts';
import { useMemo, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { FiEye } from 'react-icons/fi';

import Tab from '../../../components/tabs/tab';
import { mediaWidthTemplates } from '../../../constants/media';

interface Props extends Omit<FlexProps, 'sx'> {
  token: Currency | undefined;
}

type Series = {
  name: string;
  data: number[];
};

const seriesData: Series[] = [
  {
    name: 'Exchange inflow / outflow',
    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8],
  },
  {
    name: 'Decentralized exchanges (total volume)',
    data: [20, 29, 37, 36, 44, 45, 50],
  },
];

export default function Chart(props: Props) {
  const { className } = props;
  const [time, setTime] = useState<'7d' | '30d' | '90d'>('7d');

  const [series] = useState<Series[]>(seriesData);

  const [visibleStates, setVisibleStates] = useState<{ [k: string]: boolean }>({
    'Exchange inflow / outflow': true,
    'Decentralized exchanges (total volume)': true,
  });

  const chartId = useMemo(() => Math.random().toString(), []);

  const handleaToggleSeries = (seriesName: string) => {
    const newVisibleStates = { ...visibleStates };
    newVisibleStates[seriesName] = !visibleStates[seriesName];
    setVisibleStates(newVisibleStates);
    OriginalApexCharts.exec(chartId, 'toggleSeries', seriesName);
  };

  const options: ApexOptions = {
    chart: {
      id: chartId,
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
        show: true,
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
        show: true,
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
    tooltip: {
      enabled: true,
    },
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
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
  };

  return (
    <Flex
      className={className}
      sx={{
        flexDirection: 'column',
      }}
    >
      <Grid
        gap={12}
        columns={[1, null, 'max-content max-content']}
        sx={{
          justifyItems: 'start',
        }}
      >
        {series.map((s, idx) => (
          <Button
            variant="ghost"
            key={s.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingX: 12,
              paddingY: 0,
              height: 'unset',
              color: 'dark.100',
              opacity: visibleStates[s.name] ? 1 : 0.3,
            }}
            onClick={() => handleaToggleSeries(s.name)}
          >
            <Box
              sx={{
                height: '8px',
                width: '8px',
                backgroundColor: (options.colors as string[])[idx],
                borderRadius: 'circle',
                marginRight: '8px',
              }}
            />
            <Text
              variant="caps200"
              sx={{
                marginRight: '8px',
              }}
            >
              {s.name}
            </Text>
            <FiEye
              sx={{
                height: '16px !important',
                width: '16px !important',
              }}
            />
          </Button>
        ))}
      </Grid>
      <Flex
        sx={{
          flexDirection: 'column',
          alignSelf: 'flex-start',
          width: '100%',
          bg: 'dark.500',
          border: '1px solid #555572',
          borderRadius: 'lg',
          marginTop: 10,
        }}
      >
        <ApexCharts options={options} series={series} type="line" height={350} />
      </Flex>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginTop: 12,
          ...mediaWidthTemplates.upToSmall({
            flexDirection: 'column',
            alignItems: 'flex-start',
          }),
        }}
      >
        <Flex>
          <Tab variant="secondary-tab" active={time === '7d'} onClick={() => setTime('7d')}>
            7 days
          </Tab>
          <Tab variant="secondary-tab" active={time === '30d'} onClick={() => setTime('30d')}>
            30 days
          </Tab>
          <Tab variant="secondary-tab" active={time === '90d'} onClick={() => setTime('90d')}>
            90 days
          </Tab>
        </Flex>
        <Flex
          sx={{
            ...mediaWidthTemplates.upToSmall({
              marginTop: 16,
            }),
          }}
        >
          <Text variant="caps200">Style: Line</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
