import { SerializedToken } from '../../reducers/token/types';
import { PoolTickData } from '../data/pools/tickData';
import { ChartDayData, PriceChartEntry, Transaction } from '../types';

export interface Pool {
  address: string;
  token0: SerializedToken;
  token1: SerializedToken;
}
export interface PoolData {
  // basic token info
  address: string;
  feeTier: number;

  token0: {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    derivedETH: number;
  };

  token1: {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    derivedETH: number;
  };

  // for tick math
  liquidity: number;
  sqrtPrice: number;
  tick: number;

  // volume
  volumeUSD: number;
  volumeUSDChange: number;
  volumeUSDWeek: number;

  // liquidity
  tvlUSD: number;
  tvlUSDChange: number;

  // prices
  token0Price: number;
  token1Price: number;

  // token amounts
  tvlToken0: number;
  tvlToken1: number;
}

export type PoolChartEntry = {
  date: number;
  volumeUSD: number;
  totalValueLockedUSD: number;
};

export interface PoolsState {
  // analytics data from
  byAddress: {
    [chainId: number]: {
      [address: string]: {
        data?: PoolData;
        chartData?: PoolChartEntry[];
        transactions?: Transaction[];
        lastUpdated?: number;
        tickData?: PoolTickData;
      };
    };
  };
}

export interface ProtocolData {
  // volume
  volumeUSD: number;
  volumeUSDChange: number;

  // in range liquidity
  tvlUSD: number;
  tvlUSDChange: number;

  // fees
  feesUSD: number;
  feeChange: number;

  // transactions
  txCount: number;
  txCountChange: number;
}

export interface ProtocolState {
  [chainId: number]: {
    lastUpdated?: number;
    data?: ProtocolData;
    chartData?: ChartDayData[];
    transactions?: Transaction[];
  };
}

export interface TokenData {
  // token is in some pool on uniswap
  exists: boolean;

  // basic token info
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  derivedETH: number;

  // volume
  volumeUSD: number;
  volumeUSDChange: number;
  volumeUSDWeek: number;
  txCount: number;

  //fees
  feesUSD: number;

  // tvl
  tvlToken: number;
  tvlUSD: number;
  tvlUSDChange: number;

  priceUSD: number;
  priceUSDChange: number;
  priceUSDChangeWeek: number;
}

export interface TokenChartEntry {
  date: number;
  volumeUSD: number;
  totalValueLockedUSD: number;
}

export interface TokensState {
  // analytics data from
  byAddress: {
    [chainId: number]: {
      [address: string]: {
        data?: TokenData;
        poolAddresses?: string[];
        chartData?: TokenChartEntry[];
        priceData: {
          oldestFetchedTimestamp?: number;
          [secondsInterval: number]: PriceChartEntry[] | undefined;
        };
        transactions?: Transaction[];
        lastUpdated?: number;
      };
    };
  };
}

export interface GraphContext {
  pool: PoolsState;
  protocol: ProtocolState;
  token: TokensState;
}
