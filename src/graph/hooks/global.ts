import { useEffect, useState } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import { TimeframeOptions } from '../constants';
import getAllPairs from '../data/getAllPairs';
import getAllTokens from '../data/getAllTokens';
import getChartData from '../data/getChartData';
import getGlobalData from '../data/getGlobalData';
import { getTimeframe } from '../utils/timeframes';
import { useClients } from './useClients';
import useEthPrice from './useEthPrice';

/**
 * Hook that fetches overview data, plus all tokens and pairs for search
 */
export function useGlobalData() {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const factoryData = graphs.useSelector((state) => state.global.ofChain[chainId ?? -1]?.factoryData);
  const dispatch = graphs.useDispatch();

  const prices = useEthPrice();

  useEffect(() => {
    async function fetchData() {
      if (!chainId || !prices) return;

      const globalData = await getGlobalData(
        prices.currentDayEthPrice,
        prices.lastDayEthPrice,
        blockClient,
        dataClient,
      );
      globalData && dispatch(graphs.actions.global.updateGlobalData({ factoryData: globalData, chainId }));

      const allPairs = await getAllPairs(dataClient);
      allPairs && dispatch(graphs.actions.global.updateAllPairs({ allPairs, chainId }));

      const allTokens = await getAllTokens(dataClient);
      allTokens && dispatch(graphs.actions.global.updateAllTokens({ allTokens, chainId }));
    }

    if (!factoryData) {
      fetchData();
    }
  }, [blockClient, chainId, dataClient, dispatch, factoryData, prices]);

  return factoryData || {};
}

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
