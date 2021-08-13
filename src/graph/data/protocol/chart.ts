import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import dayjs from 'dayjs';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';

import useActiveChainId from '../../../hooks/useActiveChainId';
import { useClients } from '../../hooks/useClients';
import { ChartDayData } from '../../types';

const ONE_DAY_UNIX = 24 * 60 * 60;

const GLOBAL_CHART = gql`
  query uniswapDayDatas($startTime: Int!, $skip: Int!) {
    uniswapDayDatas(first: 1000, skip: $skip, where: { date_gt: $startTime }, orderBy: date, orderDirection: asc) {
      id
      date
      volumeUSD
      tvlUSD
    }
  }
`;

interface ChartResults {
  uniswapDayDatas: {
    date: number;
    volumeUSD: string;
    tvlUSD: string;
  }[];
}

async function fetchChartData(client: ApolloClient<NormalizedCacheObject>) {
  let data: {
    date: number;
    volumeUSD: string;
    tvlUSD: string;
  }[] = [];
  const startTimestamp = 1619170975;
  const endTimestamp = dayjs.utc().unix();

  let error = false;
  let skip = 0;
  let allFound = false;

  try {
    while (!allFound) {
      const {
        data: chartResData,
        error,
        loading,
      } = await client.query<ChartResults>({
        query: GLOBAL_CHART,
        variables: {
          startTime: startTimestamp,
          skip,
        },
        fetchPolicy: 'cache-first',
      });
      if (!loading) {
        skip += 1000;
        if (chartResData.uniswapDayDatas.length < 1000 || error) {
          allFound = true;
        }
        if (chartResData) {
          data = data.concat(chartResData.uniswapDayDatas);
        }
      }
    }
  } catch {
    error = true;
  }

  if (data) {
    const formattedExisting = data.reduce((accum: { [date: number]: ChartDayData }, dayData) => {
      const roundedDate = parseInt((dayData.date / ONE_DAY_UNIX).toFixed(0));
      accum[roundedDate] = {
        date: dayData.date,
        volumeUSD: parseFloat(dayData.volumeUSD),
        tvlUSD: parseFloat(dayData.tvlUSD),
      };
      return accum;
    }, {});

    const firstEntry = formattedExisting[parseInt(Object.keys(formattedExisting)[0])];

    // fill in empty days ( there will be no day datas if no trades made that day )
    let timestamp = firstEntry?.date ?? startTimestamp;
    let latestTvl = firstEntry?.tvlUSD ?? 0;
    while (timestamp < endTimestamp - ONE_DAY_UNIX) {
      const nextDay = timestamp + ONE_DAY_UNIX;
      const currentDayIndex = parseInt((nextDay / ONE_DAY_UNIX).toFixed(0));
      if (!Object.keys(formattedExisting).includes(currentDayIndex.toString())) {
        formattedExisting[currentDayIndex] = {
          date: nextDay,
          volumeUSD: 0,
          tvlUSD: latestTvl,
        };
      } else {
        latestTvl = formattedExisting[currentDayIndex].tvlUSD;
      }
      timestamp = nextDay;
    }

    const dateMap = Object.keys(formattedExisting).map((key) => {
      return formattedExisting[parseInt(key)];
    });

    return {
      data: dateMap,
      error: false,
    };
  } else {
    return {
      data: undefined,
      error,
    };
  }
}

/**
 * Fetch historic chart data
 */
export function useFetchGlobalChartData(): {
  error: boolean;
  data?: ChartDayData[];
} {
  const [data, setData] = useState<{ [network: number]: ChartDayData[] | undefined }>();
  const [error, setError] = useState(false);
  const { dataClient } = useClients();

  const chainId = useActiveChainId();
  const indexedData = data?.[chainId];

  useEffect(() => {
    async function fetch() {
      const { data, error } = await fetchChartData(dataClient);
      if (data && !error) {
        setData({
          [chainId]: data,
        });
      } else if (error) {
        setError(true);
      }
    }
    if (!indexedData && !error) {
      fetch();
    }
  }, [chainId, dataClient, error, indexedData]);

  return {
    error,
    data: indexedData,
  };
}
