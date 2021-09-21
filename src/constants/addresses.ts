import { SupportedChainId, Token } from '@manekiswap/sdk';

import { DAI, USDC, USDT, WBTC } from './token';
import { WETH9_EXTENDED } from './weth9';

export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [SupportedChainId.MAINNET]: [
    [
      new Token(SupportedChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(
        SupportedChainId.MAINNET,
        '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
        8,
        'cUSDC',
        'Compound USD Coin',
      ),
    ],
    [USDC, USDT],
    [DAI, USDT],
  ],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: { [chainId: number]: Token[] } = {
  [SupportedChainId.MAINNET]: [WETH9_EXTENDED[SupportedChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [SupportedChainId.RINKEBY]: [WETH9_EXTENDED[SupportedChainId.RINKEBY]],
};
