import { Token, WETH9 } from '@uniswap/sdk-core';

export const EXTENDED_WETH: { [chainId: number]: Token } = {
  ...WETH9,
};
