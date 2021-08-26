import { Token } from '@uniswap/sdk-core';
import invariant from 'tiny-invariant';

import { SerializedToken } from '../reducers/token/types';
import { SupportedChainId } from './chains';
import { TokenInfo } from './tokens/types';

export const utils = (function () {
  const fromSerializedToken = (token: SerializedToken): Token => {
    return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name);
  };

  const fromTokenInfo = (token: TokenInfo): Token => {
    return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name);
  };

  const toSerializedToken = (token: Token): SerializedToken => {
    return {
      chainId: token.chainId,
      address: token.address,
      decimals: token.decimals,
      symbol: token.symbol,
      name: token.name,
      logoURI: undefined,
    };
  };

  const sortsByAddress = (t1: Token, t2: Token): boolean => {
    invariant(t1.chainId === t2.chainId, 'ChainId should be same');
    invariant(!t1.equals(t2), 'Addresses should not be equal');

    return t1.address.toLowerCase() < t2.address.toLowerCase();
  };

  const sortsBySymbol = (t1: Token, t2: Token): boolean => {
    invariant(t1.chainId === t2.chainId, 'ChainId should be same');
    invariant(!t1.equals(t2), 'Addresses should not be equal');

    if (!t1.symbol || !t2.symbol) return sortsByAddress(t1, t2);
    return t1.symbol.toLowerCase() < t2.symbol.toLowerCase();
  };

  return {
    fromSerializedToken,
    fromTokenInfo,
    toSerializedToken,
    sortsByAddress,
    sortsBySymbol,
  };
})();

export const AMPL = new Token(
  SupportedChainId.MAINNET,
  '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
  9,
  'AMPL',
  'Ampleforth',
);

export const DAI = new Token(
  SupportedChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin',
);

export const USDC = new Token(
  SupportedChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C',
);

export const USDT = new Token(
  SupportedChainId.MAINNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
);

export const WBTC = new Token(
  SupportedChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC',
);

export const COMMON_TOKENS = [DAI, USDC, USDT, WBTC];
