import { SupportedChainId, Token } from '@manekiswap/sdk';

import { WETH9_EXTENDED, WMATIC_EXTENDED } from './extended-native';
import { CDAI, CUSDC, DAI, USDC, USDT, WBTC } from './token';

export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [SupportedChainId.MAINNET]: [
    [CDAI[SupportedChainId.MAINNET], CUSDC[SupportedChainId.MAINNET]],
    [USDC[SupportedChainId.MAINNET], USDT[SupportedChainId.MAINNET]],
    [DAI[SupportedChainId.MAINNET], USDT[SupportedChainId.MAINNET]],
  ],
  [SupportedChainId.RINKEBY]: [
    [CDAI[SupportedChainId.RINKEBY], CUSDC[SupportedChainId.RINKEBY]],
    [USDC[SupportedChainId.RINKEBY], USDT[SupportedChainId.RINKEBY]],
    [DAI[SupportedChainId.RINKEBY], USDT[SupportedChainId.RINKEBY]],
  ],
  [SupportedChainId.POLYGON]: [
    [USDC[SupportedChainId.POLYGON], USDT[SupportedChainId.POLYGON]],
    [DAI[SupportedChainId.POLYGON], USDT[SupportedChainId.POLYGON]],
  ],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: { [chainId: number]: Token[] } = {
  [SupportedChainId.MAINNET]: [
    WETH9_EXTENDED[SupportedChainId.MAINNET],
    DAI[SupportedChainId.MAINNET],
    USDC[SupportedChainId.MAINNET],
    USDT[SupportedChainId.MAINNET],
    WBTC[SupportedChainId.MAINNET],
  ],
  [SupportedChainId.RINKEBY]: [
    WETH9_EXTENDED[SupportedChainId.RINKEBY],
    DAI[SupportedChainId.RINKEBY],
    USDC[SupportedChainId.RINKEBY],
    USDT[SupportedChainId.RINKEBY],
    WBTC[SupportedChainId.RINKEBY],
  ],
  [SupportedChainId.POLYGON]: [
    WMATIC_EXTENDED[SupportedChainId.POLYGON],
    DAI[SupportedChainId.POLYGON],
    USDC[SupportedChainId.POLYGON],
    USDT[SupportedChainId.POLYGON],
    WBTC[SupportedChainId.POLYGON],
  ],
};
