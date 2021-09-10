import { Token, WETH9 } from '@manekiswap/sdk';

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
};
