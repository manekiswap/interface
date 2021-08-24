import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core';
import { useMemo } from 'react';

import { useETHBalances } from './useEthBalances';
import { useTokenBalances } from './useTokenBalances';

export default function useCurrencyBalances(
  address?: string,
  currencies?: (Currency | undefined)[],
): (CurrencyAmount<Currency> | undefined)[] {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies],
  );

  const tokenBalances = useTokenBalances(address, tokens);
  const containsETH: boolean = useMemo(() => currencies?.some((currency) => currency?.isNative) ?? false, [currencies]);
  const ethBalance = useETHBalances(containsETH ? [address] : []);

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!address || !currency) return undefined;
        if (currency.isToken) return tokenBalances[currency.address];
        if (currency.isNative) return ethBalance[address];
        return undefined;
      }) ?? [],
    [address, currencies, ethBalance, tokenBalances],
  );
}

export function useCurrencyBalance(address?: string, currency?: Currency): CurrencyAmount<Currency> | undefined {
  return useCurrencyBalances(address, [currency])[0];
}
