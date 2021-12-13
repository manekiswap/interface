import { SupportedChainId, Token } from '@manekiswap/sdk';
import { TokenInfo } from '@manekiswap/token-lists';

import { SerializedToken } from '../reducers/token/types';

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

  return {
    fromSerializedToken,
    fromTokenInfo,
    toSerializedToken,
  };
})();

export const DAI = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    18,
    'DAI',
    'Dai Stablecoin',
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
    18,
    'DAI',
    'Dai Stablecoin',
  ),
  [SupportedChainId.POLYGON]: new Token(
    SupportedChainId.POLYGON,
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    18,
    'DAI',
    'Dai Stablecoin',
  ),
};

export const USDC = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    6,
    'USDC',
    'USD//C',
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
    6,
    'USDC',
    'USD//C',
  ),
  [SupportedChainId.POLYGON]: new Token(
    SupportedChainId.POLYGON,
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    6,
    'USDC',
    'USD//C',
  ),
};

export const USDT = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    6,
    'USDT',
    'Tether USD',
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02',
    6,
    'USDT',
    'Tether USD',
  ),
  [SupportedChainId.POLYGON]: new Token(
    SupportedChainId.POLYGON,
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    6,
    'USDT',
    'Tether USD',
  ),
};

export const WBTC = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    8,
    'WBTC',
    'Wrapped BTC',
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0x577D296678535e4903D59A4C929B718e1D575e0A',
    8,
    'WBTC',
    'Wrapped BTC',
  ),
  [SupportedChainId.POLYGON]: new Token(
    SupportedChainId.POLYGON,
    '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    8,
    'WBTC',
    'Wrapped BTC',
  ),
};

export const CDAI = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
    8,
    'cDAI',
    'Compound Dai',
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0x6D7F0754FFeb405d23C51CE938289d4835bE3b14',
    8,
    'cDAI',
    'Compound Dai',
  ),
};

export const CUSDC = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
    8,
    'cUSDC',
    'Compound USD Coin',
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0x5B281A6DdA0B271e91ae35DE655Ad301C976edb1',
    8,
    'cUSDC',
    'Compound USD Coin',
  ),
};
