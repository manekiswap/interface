import { CurrencyAmount, Token } from '@uniswap/sdk-core';

import { useTokenBalancesWithLoadingIndicator } from './useTokenBalancesWithLoadingIndicator';

export function useTokenBalances(
  tokens: Token[],
  address?: string,
): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  return useTokenBalancesWithLoadingIndicator(tokens, address)[0];
}

// get the balance for a single token/account combo
export function useTokenBalance(token: Token, account?: string): CurrencyAmount<Token> | undefined {
  const tokenBalances = useTokenBalances([token], account);
  if (!token) return undefined;
  return tokenBalances[token.address];
}
