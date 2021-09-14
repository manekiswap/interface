import { useEffect } from 'react';

import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import useGetGlobalChartData from '../hooks/useGetGlobalChartData';
import useGetGlobalData from '../hooks/useGetGlobalData';
import useGetGlobalTransactions from '../hooks/useGetGlobalTransactions';

export default function GlobalUpdater(): null {
  const getGlobalChartData = useGetGlobalChartData();
  const getGlobalData = useGetGlobalData();
  const getGlobalTransactions = useGetGlobalTransactions();
  const isWindowVisible = useIsWindowVisible();

  // useEffect(() => {
  //   if (!isWindowVisible) return;

  //   // refresh list on focusing window
  //   // need to review cache policy
  //   getGlobalChartData();
  //   getGlobalData();
  //   getGlobalTransactions();
  // }, [getGlobalChartData, getGlobalData, getGlobalTransactions, isWindowVisible]);

  useEffect(() => {
    getGlobalChartData();
    getGlobalData();
    getGlobalTransactions();
  }, [getGlobalChartData, getGlobalData, getGlobalTransactions]);

  return null;
}
