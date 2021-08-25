import { Token, WETH9 } from '@uniswap/sdk-core';

import { SupportedChainId } from './chains';

export const EXTENDED_WETH: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0x259aC2c5B931C549e0F54174C10E41C6d06C9Cc8',
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
