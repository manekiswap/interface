import { Currency, CurrencyAmount, Percent, Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import JSBI from 'jsbi';

import useActiveWeb3React from './useActiveWeb3React';
import { usePair } from './usePairs';
import { useTokenBalances } from './useTokenBalances';
import { useTotalSupply } from './useTotalSupply';

export enum Field {
  LIQUIDITY_PERCENT = 'LIQUIDITY_PERCENT',
  LIQUIDITY = 'LIQUIDITY',
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}

export function useDerivedBurnInfo(
  typedValue: string,
  currencyA?: Currency,
  currencyB?: Currency,
): {
  pair?: Pair | null;
  parsedAmounts: {
    [Field.LIQUIDITY_PERCENT]: Percent;
    [Field.LIQUIDITY]?: CurrencyAmount<Token>;
    [Field.CURRENCY_A]?: CurrencyAmount<Currency>;
    [Field.CURRENCY_B]?: CurrencyAmount<Currency>;
  };
  error?: string;
} {
  const { account } = useActiveWeb3React();

  // pair + totalsupply
  const [, pair] = usePair(currencyA, currencyB);

  // balances
  const relevantTokenBalances = useTokenBalances(pair ? [pair.liquidityToken] : [], account ?? undefined);
  const userLiquidity: undefined | CurrencyAmount<Token> = relevantTokenBalances?.[pair?.liquidityToken?.address ?? ''];

  const [tokenA, tokenB] = [currencyA?.wrapped, currencyB?.wrapped];

  // liquidity values
  const totalSupply = useTotalSupply(pair?.liquidityToken);

  const liquidityValueA =
    pair &&
    totalSupply &&
    userLiquidity &&
    tokenA &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient)
      ? CurrencyAmount.fromRawAmount(tokenA, pair.getLiquidityValue(tokenA, totalSupply, userLiquidity, false).quotient)
      : undefined;

  const liquidityValueB =
    pair &&
    totalSupply &&
    userLiquidity &&
    tokenB &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient)
      ? CurrencyAmount.fromRawAmount(tokenB, pair.getLiquidityValue(tokenB, totalSupply, userLiquidity, false).quotient)
      : undefined;

  const percentToRemove = new Percent(typedValue, '100');

  const parsedAmounts: {
    [Field.LIQUIDITY_PERCENT]: Percent;
    [Field.LIQUIDITY]?: CurrencyAmount<Token>;
    [Field.CURRENCY_A]?: CurrencyAmount<Currency>;
    [Field.CURRENCY_B]?: CurrencyAmount<Currency>;
  } = {
    [Field.LIQUIDITY_PERCENT]: percentToRemove,
    [Field.LIQUIDITY]:
      userLiquidity && percentToRemove && percentToRemove.greaterThan('0')
        ? CurrencyAmount.fromRawAmount(
            userLiquidity.currency,
            percentToRemove.multiply(userLiquidity.quotient).quotient,
          )
        : undefined,
    [Field.CURRENCY_A]:
      tokenA && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueA
        ? CurrencyAmount.fromRawAmount(tokenA, percentToRemove.multiply(liquidityValueA.quotient).quotient)
        : undefined,
    [Field.CURRENCY_B]:
      tokenB && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueB
        ? CurrencyAmount.fromRawAmount(tokenB, percentToRemove.multiply(liquidityValueB.quotient).quotient)
        : undefined,
  };

  let error: string | undefined;
  if (!account) {
    error = 'Connect Wallet';
  }

  if (!parsedAmounts[Field.LIQUIDITY] || !parsedAmounts[Field.CURRENCY_A] || !parsedAmounts[Field.CURRENCY_B]) {
    error = error ?? 'Enter an amount';
  }

  return { pair, parsedAmounts, error };
}
