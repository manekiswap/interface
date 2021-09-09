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

export interface PairState {
  ofChain: {
    [chainId: number]: {
      byAddress: {
        [address: string]: {};
      };
    };
  };
}

export interface TokenState {
  ofChain: {
    [chainId: number]: {
      byAddress: {
        [address: string]: {};
      };
      combinedVol: number;
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
