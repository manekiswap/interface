import { SupportedChainId, Token } from '@manekiswap/sdk';

import { ExtendedEther } from './extended-ether';
import { AMPL, DAI, USDC, USDT, WBTC } from './token';
import { WETH9_EXTENDED } from './weth9';

type ChainTokenList = {
  readonly [chainId: number]: Token[];
};

const WETH_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WETH9_EXTENDED).map(([key, value]) => [key, [value]]),
);

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [SupportedChainId.MAINNET]: [...WETH_ONLY[SupportedChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [SupportedChainId.RINKEBY]: [
    ...WETH_ONLY[SupportedChainId.RINKEBY],
    new Token(SupportedChainId.RINKEBY, '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735', 18, 'DAI', 'Dai Stablecoin'),
  ],
};

export const ADDITIONAL_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
  [SupportedChainId.MAINNET]: {},
};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
  [SupportedChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH9_EXTENDED[SupportedChainId.MAINNET]],
  },
};

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES = {
  [SupportedChainId.MAINNET]: [
    ExtendedEther.onChain(SupportedChainId.MAINNET),
    DAI,
    USDC,
    USDT,
    WBTC,
    WETH9_EXTENDED[SupportedChainId.MAINNET],
  ],
  [SupportedChainId.ROPSTEN]: [
    ExtendedEther.onChain(SupportedChainId.ROPSTEN),
    WETH9_EXTENDED[SupportedChainId.ROPSTEN],
  ],
  [SupportedChainId.RINKEBY]: [
    ExtendedEther.onChain(SupportedChainId.RINKEBY),
    WETH9_EXTENDED[SupportedChainId.RINKEBY],
  ],
  [SupportedChainId.GÖRLI]: [ExtendedEther.onChain(SupportedChainId.GÖRLI), WETH9_EXTENDED[SupportedChainId.GÖRLI]],
  [SupportedChainId.KOVAN]: [ExtendedEther.onChain(SupportedChainId.KOVAN), WETH9_EXTENDED[SupportedChainId.KOVAN]],
};
