import { Percent } from '@uniswap/sdk-core';
import JSBI from 'jsbi';

export const NetworkContextName = 'NETWORK';

export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));

export const ZERO_PERCENT = new Percent('0');
export const ONE_HUNDRED_PERCENT = new Percent('1');

export const DEFAULT_ADD_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(50, 10_000);
export const DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100);

export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const FIVE = JSBI.BigInt(5);
export const _997 = JSBI.BigInt(997);
export const _1000 = JSBI.BigInt(1000);

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);
