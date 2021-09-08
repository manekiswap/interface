export interface GlobalData {
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
      globalData: GlobalData;
    };
  };
}

export interface PairState {
  byAddress: {
    [chainId: number]: {
      [address: string]: {};
    };
  };
}

export interface TokenState {
  byAddress: {
    [chainId: number]: {
      [address: string]: {};
    };
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserState {}

export interface GraphContext {
  global: GlobalState;
  pair: PairState;
  token: TokenState;
  user: UserState;
}
