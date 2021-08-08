export type ShortToken = {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
};

export interface SwapState {
  token0?: ShortToken;
  token1?: ShortToken;
  value?: string;
}