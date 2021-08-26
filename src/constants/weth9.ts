import { Token, WETH9 } from '@uniswap/sdk-core';

import { SupportedChainId } from './chains';

export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0x17a9ffaf9cd30476caa1b8d824c814921e38471e',
    18,
    'WETH',
    'Wrapped Ether',
  ),
  [SupportedChainId.LOCAL]: new Token(
    SupportedChainId.LOCAL,
    '0x4b619F0aE6706A5911e1CDa2D35859FB5b6fd305',
    18,
    'WETH',
    'Wrapped Ether',
  ),
};
