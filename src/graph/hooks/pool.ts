import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useState } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { graphs, useGraphDispatch, useGraphSelector } from '../context';
import { PoolChartEntry, PoolData } from '../context/types';
import { fetchPoolChartData } from '../data/pools/chartData';
import { PoolTickData } from '../data/pools/tickData';
import { fetchPoolTransactions } from '../data/pools/transactions';
import { Transaction } from '../types';
import { useClients } from './useClients';

export function useAllPoolData(): {
  [address: string]: { data?: PoolData; lastUpdated?: number };
} {
  const { chainId } = useActiveWeb3React();
  return useGraphSelector((s) => s.pool.byAddress[chainId ?? -1]);
}

export function useUpdatePoolData(): (pools: PoolData[]) => void {
  const dispatch = useGraphDispatch();
  const { chainId } = useActiveWeb3React();
  return useCallback(
    (pools: PoolData[]) => !!chainId && dispatch(graphs.pool.updatePoolData({ pools, chainId })),
    [chainId, dispatch],
  );
}

export function useAddPoolKeys(): (addresses: string[]) => void {
  const dispatch = useGraphDispatch();
  const { chainId } = useActiveWeb3React();
  return useCallback(
    (poolAddresses: string[]) => !!chainId && dispatch(graphs.pool.addPoolKeys({ poolAddresses, chainId })),
    [chainId, dispatch],
  );
}

export function usePoolDatas(poolAddresses: string[]): PoolData[] {
  const allPoolData = useAllPoolData();
  const addPoolKeys = useAddPoolKeys();

  const untrackedAddresses = poolAddresses.reduce((accum: string[], address) => {
    if (!Object.keys(allPoolData).includes(address)) {
      accum.push(address);
    }
    return accum;
  }, []);

  useEffect(() => {
    if (untrackedAddresses) {
      addPoolKeys(untrackedAddresses);
    }
    return;
  }, [addPoolKeys, untrackedAddresses]);

  // filter for pools with data
  const poolsWithData = poolAddresses.reduce((memo, address) => {
    const poolData = allPoolData[address]?.data;
    if (isEmpty(poolData)) return memo;
    return [...memo, poolData as PoolData];
  }, [] as PoolData[]);

  return poolsWithData;
}

/**
 * Get top pools addresses that token is included in
 * If not loaded, fetch and store
 * @param address
 */
export function usePoolChartData(address: string): PoolChartEntry[] | undefined {
  const dispatch = useGraphDispatch();
  const { chainId } = useActiveWeb3React();

  const pool = useGraphSelector((s) => s.pool.byAddress[chainId ?? -1]?.[address]);
  const chartData = pool?.chartData;
  const [error, setError] = useState(false);
  const { dataClient } = useClients();

  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchPoolChartData(address, dataClient);
      if (!error && data) {
        !!chainId && dispatch(graphs.pool.updatePoolChartData({ poolAddress: address, chartData: data, chainId }));
      }
      if (error) {
        setError(error);
      }
    }
    if (!chartData && !error) {
      fetch();
    }
  }, [address, chainId, chartData, dataClient, dispatch, error]);

  return chartData;
}

/**
 * Get all transactions on pool
 * @param address
 */
export function usePoolTransactions(address: string): Transaction[] | undefined {
  const dispatch = useGraphDispatch();
  const { chainId } = useActiveWeb3React();
  const pool = useGraphSelector((s) => s.pool.byAddress[chainId ?? -1]?.[address]);
  const transactions = pool?.transactions;
  const [error, setError] = useState(false);
  const { dataClient } = useClients();

  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchPoolTransactions(address, dataClient);
      if (error) {
        setError(true);
      } else if (data) {
        !!chainId &&
          dispatch(graphs.pool.updatePoolTransactions({ poolAddress: address, transactions: data, chainId }));
      }
    }
    if (!transactions && !error) {
      fetch();
    }
  }, [address, chainId, dataClient, dispatch, error, transactions]);

  return transactions;
}

export function usePoolTickData(
  address: string,
): [PoolTickData | undefined, (poolAddress: string, tickData: PoolTickData) => void] {
  const dispatch = useGraphDispatch();
  const { chainId } = useActiveWeb3React();
  const pool = useGraphSelector((s) => s.pool[chainId ?? -1]?.[address]);
  const tickData = pool.tickData;

  const setPoolTickData = useCallback(
    (address: string, tickData: PoolTickData) =>
      !!chainId && dispatch(graphs.pool.updateTickData({ poolAddress: address, tickData, chainId })),
    [chainId, dispatch],
  );

  return [tickData, setPoolTickData];
}
