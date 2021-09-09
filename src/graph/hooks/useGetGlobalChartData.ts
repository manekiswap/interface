import { useCallback, useEffect, useState } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import { TimeframeOptions } from '../constants';
import getChartData from '../data/getChartData';
import { getTimeframe } from '../utils/timeframes';
import { useClients } from './useClients';

export default function useGetGlobalChartData() {
  const { chainId } = useActiveWeb3React();
  const { dataClient } = useClients();

  const dispatch = graphs.useDispatch();

  const [oldestDateFetch, setOldestDateFetched] = useState<number | undefined>();
  const activeWindow = TimeframeOptions.ALL_TIME;

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
  return useCallback(async () => {
    if (!chainId || !oldestDateFetch) return;

    // historical stuff for chart
    const [newChartData, newWeeklyData] = await getChartData(oldestDateFetch, dataClient);
    dispatch(graphs.actions.global.updateChartData({ daily: newChartData, weekly: newWeeklyData, chainId }));
  }, [chainId, dataClient, dispatch, oldestDateFetch]);
}
