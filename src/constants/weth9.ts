import { SupportedChainId, Token, WETH9 } from '@manekiswap/sdk';

export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0x4501e78FA1276fe0d26B1fd8d1C5267B7642cA11',
    18,
    'WETH',
    'Wrapped Ether',
  ),
};
