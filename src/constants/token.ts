import invariant from 'tiny-invariant';

import { ShortToken } from '../reducers/swap/types';
import { SerializedToken } from '../reducers/token/types';
import { SupportedChainId } from './chains';
import { TokenInfo } from './tokens/types';

export class Token {
  readonly chainId: number;
  readonly address: string;
  readonly decimals: number;
  readonly symbol?: string;
  readonly name?: string;
  readonly tags?: string[];

  private readonly _native: boolean;

  constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    tags?: string[],
    native = false,
  ) {
    this.chainId = chainId;
    this.address = address;
    this.decimals = decimals;
    this.symbol = symbol;
    this.name = name;
    this.tags = tags;
    this._native = native;
  }

  static fromSerializedToken(token: SerializedToken): Token {
    return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name, token.tags);
  }

  static fromShortToken(token: ShortToken): Token {
    return new Token(token.chainId, token.address, token.decimals, token.symbol, '', []);
  }

  static fromTokenInfo(token: TokenInfo): Token {
    return new Token(token.chainId, token.address, token.decimals, token.symbol, token.name, token.tags);
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
      decimals: this.decimals,
      symbol: this.symbol,
    };
  }

  toSerializedToken(): SerializedToken {
    return {
      chainId: this.chainId,
      address: this.address,
      decimals: this.decimals,
      symbol: this.symbol,
      name: this.name,
      logoURI: undefined,
      tags: this.tags,
    };
  }

  equals(other: Token): boolean {
    return (
      other.chainId === this.chainId && other.isToken && other.address.toLowerCase() === this.address.toLowerCase()
    );
  }

  sortsByAddress(other: Token): boolean {
    invariant(!this.equals(other), 'Addresses should not be equal');

    return this.address.toLowerCase() < other.address.toLowerCase();
  }

  sortsBySymbol(other: Token): boolean {
    invariant(!this.equals(other), 'Addresses should not be equal');

    if (!this.symbol || !other.symbol) return this.sortsByAddress(other);
    return this.symbol.toLowerCase() < other.symbol.toLowerCase();
  }
}

export const ETH = new Token(SupportedChainId.MAINNET, '', 18, 'ETH', 'Ether', [], true);

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
