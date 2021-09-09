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
