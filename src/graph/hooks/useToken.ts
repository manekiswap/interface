import { Token } from '@uniswap/sdk-core';
import { useMemo } from 'react';

export function useToken(
  chainId: number,
  token?: {
    name?: string;
    symbol?: string;
    address: string;
    decimals: number;
  },
) {
  return useMemo(() => {
    if (!token) return undefined;
    return new Token(chainId, token.address, token.decimals, token.symbol, token.name);
  }, [chainId, token]);
}
