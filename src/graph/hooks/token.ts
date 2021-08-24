import { isAddress } from '@ethersproject/address';
import dayjs, { OpUnitType } from 'dayjs';
import { isEmpty } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import useActiveChainId from '../../hooks/useActiveChainId';
import { graphs, useGraphDispatch, useGraphSelector } from '../context';
import { TokenChartEntry, TokenData } from '../context/types';
import { fetchTokenChartData } from '../data/tokens/chartData';
import { fetchPoolsForToken } from '../data/tokens/poolsForToken';
import { fetchTokenPriceData } from '../data/tokens/priceData';
import { fetchTokenTransactions } from '../data/tokens/transactions';
import { PriceChartEntry, Transaction } from '../types';
import { useClients } from './useClients';

export function useAllTokenData(): {
  [address: string]: { data?: TokenData; lastUpdated?: number };
} {
  const chainId = useActiveChainId();
  return useGraphSelector((s) => s.token.byAddress[chainId ?? -1] ?? {});
}

export function useUpdateTokenData(): (tokens: TokenData[]) => void {
  const dispatch = useGraphDispatch();
  const chainId = useActiveChainId();
  return useCallback(
    (tokens: TokenData[]) => {
      !!chainId && dispatch(graphs.token.updateTokenData({ tokens, chainId }));
    },
    [chainId, dispatch],
  );
}

export function useAddTokenKeys(): (addresses: string[]) => void {
  const dispatch = useGraphDispatch();
  const chainId = useActiveChainId();
  return useCallback(
    (tokenAddresses: string[]) => !!chainId && dispatch(graphs.token.addTokenKeys({ tokenAddresses, chainId })),
    [chainId, dispatch],
  );
}

export function useTokenDatas(addresses: string[] | undefined): TokenData[] | undefined {
  const allTokenData = useAllTokenData();
  const addTokenKeys = useAddTokenKeys();

  // if token not tracked yet track it
  addresses?.map((a) => {
    if (!allTokenData[a]) {
      addTokenKeys([a]);
    }
  });

  const data = useMemo(() => {
    if (!addresses) {
      return undefined;
    }
    return addresses.reduce((memo, address) => {
      const tokenData = allTokenData[address]?.data;
      if (isEmpty(tokenData)) return memo;
      return [...memo, tokenData as TokenData];
    }, [] as TokenData[]);
  }, [addresses, allTokenData]);

  return data;
}

export function useTokenData(address: string | undefined): TokenData | undefined {
  const allTokenData = useAllTokenData();
  const addTokenKeys = useAddTokenKeys();

  // if invalid address return
  if (!address || !isAddress(address)) {
    return undefined;
  }

  // if token not tracked yet track it
  if (!allTokenData[address]) {
    addTokenKeys([address]);
  }

  return allTokenData[address]?.data;
}

/**
 * Get top pools addresses that token is included in
 * If not loaded, fetch and store
 * @param address
 */
export function usePoolsForToken(address: string): string[] | undefined {
  const dispatch = useGraphDispatch();
  const chainId = useActiveChainId();
  const token = useGraphSelector((s) => s.token.byAddress[chainId ?? -1]?.[address]);
  const poolsForToken = token.poolAddresses;
  const [error, setError] = useState(false);
  const { dataClient } = useClients();

  useEffect(() => {
    async function fetch() {
      const { loading, error, addresses } = await fetchPoolsForToken(address, dataClient);
      if (!loading && !error && addresses) {
        !!chainId &&
          dispatch(graphs.token.addPoolAddresses({ tokenAddress: address, poolAddresses: addresses, chainId }));
      }
      if (error) {
        setError(error);
      }
    }
    if (!poolsForToken && !error) {
      fetch();
    }
  }, [address, chainId, dataClient, dispatch, error, poolsForToken]);

  return poolsForToken;
}

/**
 * Get top pools addresses that token is included in
 * If not loaded, fetch and store
 * @param address
 */
export function useTokenChartData(address: string): TokenChartEntry[] | undefined {
  const dispatch = useGraphDispatch();
  const chainId = useActiveChainId();
  const token = useGraphSelector((s) => s.token.byAddress[chainId ?? -1]?.[address]);
  const chartData = token.chartData;
  const [error, setError] = useState(false);
  const { dataClient } = useClients();

  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchTokenChartData(address, dataClient);
      if (!error && data) {
        !!chainId && dispatch(graphs.token.updateChartData({ tokenAddress: address, chartData: data, chainId }));
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
 * Get top pools addresses that token is included in
 * If not loaded, fetch and store
 * @param address
 */
export function useTokenPriceData(
  address: string,
  interval: number,
  timeWindow: OpUnitType,
): PriceChartEntry[] | undefined {
  const dispatch = useGraphDispatch();
  const chainId = useActiveChainId();
  const token = useGraphSelector((s) => s.token.byAddress[chainId ?? -1]?.[address]);
  const priceData = token.priceData[interval];
  const [error, setError] = useState(false);
  const { dataClient, blockClient } = useClients();

  // construct timestamps and check if we need to fetch more data
  const oldestTimestampFetched = token.priceData.oldestFetchedTimestamp;
  const utcCurrentTime = dayjs();
  const startTimestamp = utcCurrentTime.subtract(1, timeWindow).startOf('hour').unix();

  useEffect(() => {
    async function fetch() {
      const { data, error: fetchingError } = await fetchTokenPriceData(
        address,
        interval,
        startTimestamp,
        dataClient,
        blockClient,
      );
      if (data) {
        !!chainId &&
          dispatch(
            graphs.token.updatePriceData({
              tokenAddress: address,
              secondsInterval: interval,
              priceData: data,
              oldestFetchedTimestamp: startTimestamp,
              chainId,
            }),
          );
      }
      if (fetchingError) {
        setError(true);
      }
    }
    if (!priceData && !error) {
      fetch();
    }
  }, [address, blockClient, chainId, dataClient, dispatch, error, interval, priceData, startTimestamp]);

  return priceData;
}

/**
 * Get top pools addresses that token is included in
 * If not loaded, fetch and store
 * @param address
 */
export function useTokenTransactions(address: string): Transaction[] | undefined {
  const dispatch = useGraphDispatch;
  const chainId = useActiveChainId();
  const token = useGraphSelector((s) => s.token.byAddress[chainId ?? -1]?.[address]);
  const transactions = token.transactions;
  const [error, setError] = useState(false);
  const { dataClient } = useClients();

  useEffect(() => {
    async function fetch() {
      const { error, data } = await fetchTokenTransactions(address, dataClient);
      if (error) {
        setError(true);
      } else if (data) {
        // dispatch(graphs.token.updateTransactions({ tokenAddress: address, transactions: data, chainId }));
      }
    }
    if (!transactions && !error) {
      fetch();
    }
  }, [address, chainId, dataClient, dispatch, error, transactions]);

  return transactions;
}
