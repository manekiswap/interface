import { Currency, NativeCurrency, SupportedChainId, Token, WETH9, WMATIC } from '@manekiswap/sdk';

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

export const WMATIC_EXTENDED: { [chainId: number]: Token } = {
  ...WMATIC,
};

export class ExtendedNative extends NativeCurrency {
  protected constructor(chainId: number) {
    if (chainId === SupportedChainId.POLYGON) {
      super(chainId, 18, 'MATIC', 'Matic');
    } else {
      super(chainId, 18, 'ETH', 'Ether');
    }
  }

  public get wrapped(): Token {
    if (this.chainId === SupportedChainId.POLYGON) {
      if (this.chainId in WMATIC_EXTENDED) return WMATIC_EXTENDED[this.chainId];
      throw new Error('Unsupported chain ID');
    } else {
      if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId];
      throw new Error('Unsupported chain ID');
    }
  }

  private static _cache: { [chainId: number]: ExtendedNative } = {};

  public static onChain(chainId: number): ExtendedNative {
    return this._cache[chainId] ?? (this._cache[chainId] = new ExtendedNative(chainId));
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }
}

export function isNativeCurrency(address?: string) {
  return address?.toUpperCase() === 'ETHER' || address?.toUpperCase() === 'MATIC';
}
