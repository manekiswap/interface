export interface AppState {
  list: ListState;
  pool: PoolState;
  swap: SwapState;
  token: TokenState;
  user: UserState;
}
/**
 * ------------------------------
 * list reducer
 * ------------------------------
 */

export type List = {
  id: string;
  url: string;
  weight: number;
  logoURI?: string;
  name?: string;
};

export interface ListState {
  listUrls: List[];
  activeListIds: string[];
  tokens: {
    [id: string]: {
      [address: string]: SerializedToken;
    };
  };
}

/**
 * ------------------------------
 * pool reducer
 * ------------------------------
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PoolState {}

/**
 * ------------------------------
 * swap reducer
 * ------------------------------
 */

export type ShortToken = {
  chainId: number;
  address: string;
  symbol?: string;
};

export interface SwapState {
  token0?: ShortToken;
  token1?: ShortToken;
  value?: string;
}

/**
 * ------------------------------
 * token reducer
 * ------------------------------
 */

export type SerializedToken = {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
  logoURI?: string;
  tags?: string[];
};

export type SerializedPair = {
  token0: SerializedToken;
  token1: SerializedToken;
};

export interface TokenState {
  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken;
    };
  };

  pairs: {
    [chainId: number]: {
      [address01: string]: SerializedPair;
    };
  };
}

/**
 * ------------------------------
 * user reducer
 * ------------------------------
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserState {
  currentChainId: number;
  theme: 'dark' | 'light';
}
