import { Flex, Heading, Image, Text } from '@theme-ui/components';
import { ApexOptions } from 'apexcharts';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, Sector } from 'recharts';

import ChartEyeImg from '../../assets/images/landing/chart-eye.png';
import useIsWindowWider from '../../hooks/useIsWindowWider';
import { useWindowSize } from '../../hooks/useWindowSize';

type DistributionInfo = {
  title: string;
  description?: string;
  dotColor: string;
  name: string;
  value: number;
};

const distributionConfig: Array<DistributionInfo> = [
  {
    title: '5% Contributors',
    dotColor: '#554423',
    name: 'contributors',
    value: 5,
  },
  {
    title: '10% Investors',
    description: 'TBD after 6 months',
    dotColor: '#8d6b2a',
    name: 'investors',
    value: 10,
  },
  {
    title: '10% Team',
    description: '20% initial after 6 months, remaining vested quarterly',
    dotColor: '#b87c0a',
    name: 'team',
    value: 10,
  },
  {
    title: '15% Founders',
    description: '20% initial after 6 months, remaining vested quarterly',
    dotColor: '#e59701',
    name: 'founders',
    value: 15,
  },
  {
    title: '25% Treasury',
    description: 'For strategic planning (rewards, bounty hunt, finance)',
    dotColor: '#e5b301',
    name: 'treasury',
    value: 25,
  },
  {
    title: '35% Community',
    description: 'Airdrop, IDO, IEO',
    dotColor: '#e5c401',
    name: 'community',
    value: 35,
  },
];

export default function TokenDistribution(props: { paddingX: string }) {
  const series = distributionConfig.map((d) => d.value);
  const options: ApexOptions = {
    chart: {
      type: 'donut',
      events: {
        dataPointMouseEnter: function (event, chartContext, config) {
          // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts.
          console.log({
            event,
            chartContext,
            config,
          });
          const index = config.dataPointIndex;

          const chart = document.getElementsByClassName('apexcharts-slices')[0];

          const rad = series.slice(0, index).reduce((sum, num) => sum + num, 0) + series[index] / 2;
          console.log(rad);
          const a = (rad / 180) * Math.PI;

          const transformX = 10 * Math.sin(a);
          const transformY = -10 * Math.cos(a);
          console.log({ transformX, transformY });
          console.log(chart);
          const g = chart.children[index];
          if (g) {
            g.children[0].setAttribute('style', `transform: translate(${transformX}px, ${transformY}px)`);
          }
        },
      },
    },
    colors: distributionConfig.map((d) => d.dotColor),
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '75%',
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 5,
      colors: ['#0e0e0e'],
    },
  };

  return (
    <Flex sx={{ width: '100%', bg: '#0e0e0e' }}>
      <ApexCharts width="500" options={options} series={series} type="donut" />
    </Flex>
  );
}
