import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import { TimeframeOptions } from '../constants';
import { GlobalData } from '../context/types';
import { GLOBAL_CHART, GLOBAL_DATA } from '../queries';
import { get2DayPercentChange, getPercentChange } from '../utils/percents';
import { getTimeframe } from '../utils/timeframes';
import { getBlocksFromTimestamps } from './useBlocks';
import { useClients } from './useClients';
import useEthPrice from './useEthPrice';

type GlobalDataResponse = {
  id: string;
  pairCount: number;
  totalVolumeUSD: string;
  totalVolumeETH: string;
  totalLiquidityUSD: string;
  totalLiquidityETH: string;
  txCount: string;
  untrackedVolumeUSD: string;
};

type GlobalChartResponse = {
  id: string;
  date: number;
  dailyVolumeETH: string;
  dailyVolumeUSD: string;
  totalLiquidityETH: string;
  totalLiquidityUSD: string;
};

/**
 * Gets all the global data for the overview page.
 * Needs current eth price and the old eth price to get
 * 24 hour USD changes.
 * @param {*} ethPrice
 * @param {*} oldEthPrice
 */
async function getGlobalData(
  ethPrice: number,
  oldEthPrice: number,
  blockClient: ApolloClient<NormalizedCacheObject>,
  dataClient: ApolloClient<NormalizedCacheObject>,
) {
  let response: GlobalData | undefined;

  try {
    // get timestamps for the days
    const utcCurrentTime = dayjs();
    const utcOneDayBack = utcCurrentTime.subtract(1, 'day').unix();
    const utcTwoDaysBack = utcCurrentTime.subtract(2, 'day').unix();
    const utcOneWeekBack = utcCurrentTime.subtract(1, 'week').unix();
    const utcTwoWeeksBack = utcCurrentTime.subtract(2, 'week').unix();

    // get the blocks needed for time travel queries
    const [oneDayBlock, twoDayBlock, oneWeekBlock, twoWeekBlock] = await getBlocksFromTimestamps(
      [utcOneDayBack, utcTwoDaysBack, utcOneWeekBack, utcTwoWeeksBack],
      blockClient,
    );

    // fetch the global data
    const result = await dataClient.query({
      query: GLOBAL_DATA(),
      fetchPolicy: 'cache-first',
    });
    const data: GlobalDataResponse = result.data.uniswapFactories[0];

    // fetch the historical data
    const oneDayResult = await dataClient.query({
      query: GLOBAL_DATA(oneDayBlock?.number),
      fetchPolicy: 'cache-first',
    });
    const oneDayData: GlobalDataResponse = oneDayResult.data.uniswapFactories[0];

    const twoDayResult = await dataClient.query({
      query: GLOBAL_DATA(twoDayBlock?.number),
      fetchPolicy: 'cache-first',
    });
    const twoDayData: GlobalDataResponse = twoDayResult.data.uniswapFactories[0];

    const oneWeekResult = await dataClient.query({
      query: GLOBAL_DATA(oneWeekBlock?.number),
      fetchPolicy: 'cache-first',
    });
    const oneWeekData = oneWeekResult.data.uniswapFactories[0];

    const twoWeekResult = await dataClient.query({
      query: GLOBAL_DATA(twoWeekBlock?.number),
      fetchPolicy: 'cache-first',
    });
    const twoWeekData = twoWeekResult.data.uniswapFactories[0];

    if (data && oneDayData && twoDayData && oneWeekData && twoWeekData) {
      const [oneDayVolumeUSD, volumeChangeUSD] = get2DayPercentChange(
        data.totalVolumeUSD,
        oneDayData.totalVolumeUSD,
        twoDayData.totalVolumeUSD,
      );

      const [oneWeekVolume, weeklyVolumeChange] = get2DayPercentChange(
        data.totalVolumeUSD,
        oneWeekData.totalVolumeUSD,
        twoWeekData.totalVolumeUSD,
      );

      const [oneDayTxns, txnChange] = get2DayPercentChange(
        data.txCount,
        oneDayData.txCount ? oneDayData.txCount : 0,
        twoDayData.txCount ? twoDayData.txCount : 0,
      );

      // format the total liquidity in USD
      const liquidityChangeUSD = getPercentChange(
        parseFloat(data.totalLiquidityETH) * ethPrice,
        parseFloat(oneDayData.totalLiquidityETH) * oldEthPrice,
      );

      response = {
        pairCount: data.pairCount,
        totalVolumeUSD: data.totalVolumeUSD,
        totalVolumeETH: data.totalLiquidityETH,
        txCount: data.txCount,
        untrackedVolumeUSD: data.untrackedVolumeUSD,
        totalLiquidityUSD: parseFloat(data.totalLiquidityETH) * ethPrice,
        totalLiquidityETH: parseFloat(data.totalLiquidityETH),

        // add relevant fields with the calculated amounts
        oneDayVolumeUSD: oneDayVolumeUSD,
        oneWeekVolume: oneWeekVolume,
        weeklyVolumeChange: weeklyVolumeChange,
        volumeChangeUSD: volumeChangeUSD,
        liquidityChangeUSD: liquidityChangeUSD,
        oneDayTxns: oneDayTxns,
        txnChange: txnChange,
      };
    }
  } catch (e) {
    console.log(e);
  }

  return response;
}

/**
 * Hook that fetches overview data, plus all tokens and pairs for search
 */
export function useGlobalData() {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const globalData = graphs.useSelector((state) => state.global.ofChain[chainId ?? -1]?.globalData);
  const dispatch = graphs.useDispatch();

  const prices = useEthPrice();

  useEffect(() => {
    async function fetchData() {
      if (!chainId || !prices) return;
      const data = await getGlobalData(prices.currentDayEthPrice, prices.lastDayEthPrice, blockClient, dataClient);
      data && dispatch(graphs.actions.global.updateGlobalData({ globalData: data, chainId }));

      // const allPairs = await getAllPairsOnUniswap();
      // updateAllPairsInUniswap(allPairs);

      // const allTokens = await getAllTokensOnUniswap();
      // updateAllTokensInUniswap(allTokens);
    }

    if (!globalData) {
      fetchData();
    }
  }, [blockClient, chainId, dataClient, dispatch, globalData, prices]);

  return globalData || {};
}

/**
 * Get historical data for volume and liquidity used in global charts
 * on main page
 * @param {*} oldestDateToFetch // start of window to fetch from
 */
const getChartData = async (
  oldestDateToFetch: number,
  dataClient: ApolloClient<NormalizedCacheObject>,
): Promise<[GlobalChartResponse[], { date: number; weeklyVolumeUSD: number }[]]> => {
  let data: GlobalChartResponse[] = [];
  const weeklyData: { date: number; weeklyVolumeUSD: number }[] = [];
  const utcEndTime = dayjs.utc();
  let skip = 0;
  let allFound = false;

  try {
    while (!allFound) {
      const { data: uniswapDayDatas } = await dataClient.query({
        query: GLOBAL_CHART,
        variables: {
          startTime: oldestDateToFetch,
          skip,
        },
        fetchPolicy: 'cache-first',
      });
      skip += 1000;
      data = uniswapDayDatas && data.concat(uniswapDayDatas);

      if (uniswapDayDatas?.length < 1000) {
        allFound = true;
      }
    }

    if (data) {
      const dayIndexSet = new Set();
      const dayIndexArray: GlobalChartResponse[] = [];
      const oneDay = 24 * 60 * 60;

      // for each day, parse the daily volume and format for chart array
      data.forEach((dayData, i) => {
        // add the day index to the set of days
        dayIndexSet.add((data[i].date / oneDay).toFixed(0));
        dayIndexArray.push(data[i]);
        dayData.dailyVolumeUSD = `${parseFloat(dayData.dailyVolumeUSD)}`;
      });

      // fill in empty days ( there will be no day datas if no trades made that day )
      let timestamp = data[0].date ? data[0].date : oldestDateToFetch;
      let latestLiquidityUSD = data[0].totalLiquidityUSD;
      let index = 1;
      while (timestamp < utcEndTime.unix() - oneDay) {
        const nextDay = timestamp + oneDay;
        const currentDayIndex = (nextDay / oneDay).toFixed(0);

        if (!dayIndexSet.has(currentDayIndex)) {
          data.push({
            id: '',
            date: nextDay,
            dailyVolumeETH: '0',
            dailyVolumeUSD: '0',
            totalLiquidityETH: '',
            totalLiquidityUSD: latestLiquidityUSD,
          });
        } else {
          latestLiquidityUSD = dayIndexArray[index].totalLiquidityUSD;
          index = index + 1;
        }
        timestamp = nextDay;
      }
    }

    // format weekly data for weekly sized chunks
    data = data.sort((a, b) => (a.date > b.date ? 1 : -1));
    let startIndexWeekly = -1;
    let currentWeek = -1;

    data.forEach((entry, i) => {
      const week = dayjs.utc(dayjs.unix(data[i].date)).week();
      if (week !== currentWeek) {
        currentWeek = week;
        startIndexWeekly++;
      }
      weeklyData[startIndexWeekly] = weeklyData[startIndexWeekly] || {};
      weeklyData[startIndexWeekly].date = data[i].date;
      weeklyData[startIndexWeekly].weeklyVolumeUSD =
        (weeklyData[startIndexWeekly].weeklyVolumeUSD ?? '0') + parseFloat(data[i].dailyVolumeUSD);
    });
  } catch (e) {
    console.log(e);
  }

  return [data, weeklyData];
};

export function useGlobalChartData() {
  const { chainId } = useActiveWeb3React();
  const { dataClient } = useClients();

  const chartData = graphs.useSelector((state) => state.global.ofChain[chainId ?? -1]?.chartData);
  const dispatch = graphs.useDispatch();

  const [oldestDateFetch, setOldestDateFetched] = useState<number | undefined>();
  const activeWindow = TimeframeOptions.ALL_TIME;

  const chartDataDaily = chartData?.daily;
  const chartDataWeekly = chartData?.weekly;

  /**
   * Keep track of oldest date fetched. Used to
   * limit data fetched until its actually needed.
   * (dont fetch year long stuff unless year option selected)
   */
  useEffect(() => {
    // based on window, get starttime
    const startTime = getTimeframe(activeWindow);

    if (!oldestDateFetch || (activeWindow && startTime < oldestDateFetch)) {
      setOldestDateFetched(startTime);
    }
  }, [activeWindow, oldestDateFetch]);

  /**
   * Fetch data if none fetched or older data is needed
   */
  useEffect(() => {
    async function fetchData() {
      if (!chainId || !oldestDateFetch) return;
      // historical stuff for chart
      const [newChartData, newWeeklyData] = await getChartData(oldestDateFetch, dataClient);
      dispatch(graphs.actions.global.updateChartData({ daily: newChartData, weekly: newWeeklyData, chainId }));
    }

    if (!chartDataDaily && !chartDataWeekly) {
      fetchData();
    }
  }, [chainId, chartDataDaily, chartDataWeekly, dataClient, dispatch, oldestDateFetch]);

  return [chartDataDaily, chartDataWeekly];
}

// export function useGlobalTransactions() {
//   const [state, { updateTransactions }] = useGlobalDataContext();
//   const transactions = state?.transactions;
//   useEffect(() => {
//     async function fetchData() {
//       if (!transactions) {
//         const txns = await getGlobalTransactions();
//         updateTransactions(txns);
//       }
//     }
//     fetchData();
//   }, [updateTransactions, transactions]);
//   return transactions;
// }
