import { SupportedChainId, Token } from '@manekiswap/sdk';

import { CDAI, CUSDC, DAI, USDC, USDT, WBTC } from './token';
import { WETH9_EXTENDED } from './weth9';

export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [SupportedChainId.MAINNET]: [
    [CDAI, CUSDC],
    [USDC, USDT],
    [DAI, USDT],
  ],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: { [chainId: number]: Token[] } = {
  [SupportedChainId.MAINNET]: [WETH9_EXTENDED[SupportedChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [SupportedChainId.RINKEBY]: [WETH9_EXTENDED[SupportedChainId.RINKEBY]],
};
