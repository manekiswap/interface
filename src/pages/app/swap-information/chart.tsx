import { Currency } from '@manekiswap/sdk';
import { Box, Button, Flex, FlexProps, Grid, Text } from '@theme-ui/components';
import OriginalApexCharts, { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { FiEye } from 'react-icons/fi';

import Tab from '../../../components/tabs/tab';
import { mediaWidthTemplates } from '../../../constants/media';

interface Props extends Omit<FlexProps, 'sx'> {
  token: Currency | undefined;
  series: Series[];
  labels: string[];
}

type Series = {
  name: string;
  data: {
    timestamp: number;
    value: number;
    growth: number;
    ranking: number;
  }[];
};

export default function Chart(props: Props) {
  const { className, series, labels } = props;
  const [time, setTime] = useState<'7d' | '30d' | '90d'>('7d');

  const data = useMemo(() => {
    const index = series.reduce((memo, metric, index) => {
      if (series[memo].data.length < metric.data.length) {
        return index;
      }
      return memo;
    }, 0);
    return series.map((el) => {
      const _data = series[index].data.map((d) => {
        const value = el.data.find((_d) => _d.timestamp === d.timestamp);
        if (!value) return [d.timestamp, 0];
        if (Number.isFinite(value.growth)) return [d.timestamp, value.value];
        return [d.timestamp, 0];
      });
      return {
        name: el.name,
        data: _data,
      };
    });
  }, [series]);

  const [visibleStates, setVisibleStates] = useState<{ [k: string]: boolean }>(() => {
    const initialState = labels.reduce((memo, s) => ({ ...memo, [s]: true }), {});
    return initialState;
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
      type: 'datetime',
      tickAmount: 6,
      crosshairs: {
        show: true,
      },
      labels: {
        style: {
          colors: '#6A6F97',
          fontWeight: 500,
        },
        formatter: function (value) {
          return dayjs.unix(Number(value)).format('YYYY-MM-DD');
        },
      },
      axisBorder: {
        color: '#6A6F97',
      },
      axisTicks: {
        show: false,
      },
    },
    markers: {
      shape: 'circle',
    },
    yaxis: [
      {
        show: true,
        opposite: true,
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
            return value + '';
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
          formatter: function (value) {
            return value + '';
          },
        },
        tooltip: {
          enabled: false,
        },
      },
    ],
    tooltip: {
      enabled: true,
      theme: 'dark',
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
        {data.map((s, idx) => (
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
        <ApexCharts options={options} series={data} type="line" height={350} />
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
        {/* <Flex
          sx={{
            ...mediaWidthTemplates.upToSmall({
              marginTop: 16,
            }),
          }}
        >
          <Text variant="caps200">Style: Line</Text>
        </Flex> */}
      </Flex>
    </Flex>
  );
}
