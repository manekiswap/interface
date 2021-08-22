import { Token, WETH9 } from '@uniswap/sdk-core';

import { SupportedChainId } from './chains';
import { DAI, USDC, USDT, WBTC } from './token';

type AddressMap = { [chainId in SupportedChainId]: string };

export const MULTICALL_NETWORKS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [SupportedChainId.ROPSTEN]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  [SupportedChainId.RINKEBY]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [SupportedChainId.GÖRLI]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [SupportedChainId.KOVAN]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
};

export const MULTICALL2_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [SupportedChainId.ROPSTEN]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [SupportedChainId.RINKEBY]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [SupportedChainId.GÖRLI]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [SupportedChainId.KOVAN]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
};

// to be updated
export const FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

export const FACTORY_ADDRESSES = {
  [SupportedChainId.MAINNET]: FACTORY_ADDRESS,
};

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
  [SupportedChainId.MAINNET]: [WETH9[SupportedChainId.MAINNET], DAI, USDC, USDT, WBTC],
};
