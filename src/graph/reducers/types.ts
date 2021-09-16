export interface FactoryData {
  pairCount: number;
  totalVolumeUSD: string;
  totalVolumeETH: string;
  totalLiquidityUSD: number;
  totalLiquidityETH: number;
  txCount: string;
  untrackedVolumeUSD: string;

  oneDayVolumeUSD: number;
  oneWeekVolume: number;
  weeklyVolumeChange: number;
  volumeChangeUSD: number;
  liquidityChangeUSD: number;
  oneDayTxns: number;
  txnChange: number;
}

export interface GlobalState {
  ofChain: {
    [chainId: number]: {
      chartData: {
        daily: {
          id: string;
          date: number;
          dailyVolumeETH: string;
          dailyVolumeUSD: string;
          totalLiquidityETH: string;
          totalLiquidityUSD: string;
        }[];
        weekly: {
          date: number;
          weeklyVolumeUSD: number;
        }[];
      };
      factoryData: FactoryData;
      allPairs: {
        id: string;
        token0: {
          id: string;
          symbol: string;
          name: string;
        };
        token1: {
          id: string;
          symbol: string;
          name: string;
        };
      }[];
      allTokens: { id: string; name: string; symbol: string; totalLiquidity: string }[];
      transactions: {
        mints: {
          transaction: {
            id: string;
            timestamp: string;
          };
          pair: {
            token0: {
              id: string;
              symbol: string;
            };
            token1: {
              id: string;
              symbol: string;
            };
          };
          to: string;
          liquidity: string;
          amount0: string;
          amount1: string;
          amountUSD: string;
        }[];
        burns: {
          transaction: {
            id: string;
            timestamp: string;
          };
          pair: {
            token0: {
              id: string;
              symbol: string;
            };
            token1: {
              id: string;
              symbol: string;
            };
          };
          se: string;
          liquidity: string;
          amount0: string;
          amount1: string;
          amountUSD: string;
        }[];
        swaps: {
          transaction: {
            id: string;
            timestamp: string;
          };
          pair: {
            token0: {
              id: string;
              symbol: string;
            };
            token1: {
              id: string;
              symbol: string;
            };
          };
          amount0In: string;
          amount0Out: string;
          amount1In: string;
          amount1Out: string;
          amountUSD: string;
          to: string;
        }[];
      };
    };
  };
}

export type TokenInfo = {
  id: string;
  derivedETH: string;
  name: string;
  symbol: string;
  decimals: string;
  totalLiquidity: string;
};

export type PairData = {
  id: string;
  createdAtTimestamp: number;
  liquidityChangeUSD: number;
  oneDayVolumeUSD: number;
  oneDayVolumeUntracked: number;
  oneWeekVolumeUSD: number;
  oneWeekVolumeUntracked: number;
  reserve0: string;
  reserve1: string;
  reserveETH: number;
  reserveUSD: number;
  token0Price: string;
  token1Price: string;
  totalSupply: string;
  trackedReserveETH: number;
  trackedReserveUSD: number;
  txCount: string;
  untrackedVolumeUSD: string;
  volumeChangeUSD: number;
  volumeChangeUntracked: number;
  volumeUSD: number;
  token0: TokenInfo;
  token1: TokenInfo;
};

export interface PairState {
  ofChain: {
    [chainId: number]: {
      byAddress: {
        [address: string]: PairData;
      };
    };
  };
}

export type TokenDayData = {
  id: string;
  derivedETH: string;
  name: string;
  symbol: string;
  totalLiquidity: string;
  tradeVolume: string;
  tradeVolumeUSD: string;
  txCount: string;
  untrackedVolumeUSD: string;
};

export type TokenData = {
  id: string;
  name: string;
  symbol: string;
  decimals: string;
  derivedETH: string;
  liquidityChangeUSD: number;
  oneDayTxns: number;
  oneDayVolumeUSD: number;
  priceChangeUSD: number;
  priceUSD: number;
  totalLiquidity: number;
  totalLiquidityUSD: number;
  tradeVolume: string;
  tradeVolumeUSD: string;
  txCount: string;
  txnChange: number;
  untrackedVolumeUSD: string;
  volumeChangeUSD: number;
  oneDayData: TokenDayData;
  twoDayData: TokenDayData;
};

export interface TokenState {
  ofChain: {
    [chainId: number]: {
      byAddress: {
        [address: string]: TokenData;
      };
    };
  };
}

export interface UserState {
  ofChain: {
    [chainId: number]: {};
  };
}

export interface GraphContext {
  global: GlobalState;
  pair: PairState;
  token: TokenState;
  user: UserState;
}
