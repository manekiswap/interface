import { ShortToken } from '../reducers/types';
import { SupportedChainId } from './chains';

export class Token {
  readonly chainId: number;
  readonly address: string;
  readonly decimals: number;
  readonly symbol?: string;
  readonly name?: string;
  private readonly _native: boolean;

  constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string, native = false) {
    this.chainId = chainId;
    this.address = address;
    this.decimals = decimals;
    this.symbol = symbol;
    this.name = name;
    this._native = native;
  }

  get isNative() {
    return this._native;
  }

  get isToken() {
    return !this._native;
  }

  toShortToken(): ShortToken {
    return {
      chainId: this.chainId,
      address: this.address,
      symbol: this.symbol,
    };
  }

  toJson() {
    return {
      chainId: this.chainId,
      address: this.address,
      decimals: this.decimals,
      symbol: this.symbol,
      name: this.name,
    };
  }
}

export const ETH = new Token(SupportedChainId.MAINNET, '', 18, 'ETH', 'Ether', true);

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

export const COMMON_TOKENS = [ETH, DAI, USDC, USDT, WBTC];
