import { Ether, Matic, Token } from '@manekiswap/sdk';

import { MATIC_EXTENDED, WETH9_EXTENDED } from './extended-native';

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId];
    throw new Error('Unsupported chain ID');
  }

  private static _cachedEther: { [chainId: number]: ExtendedEther } = {};

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedEther[chainId] ?? (this._cachedEther[chainId] = new ExtendedEther(chainId));
  }
}

export class ExtendedMatic extends Matic {
  protected constructor(chainId: number) {
    super(chainId);
  }

  public get wrapped(): Token {
    if (this.chainId in MATIC_EXTENDED) return MATIC_EXTENDED[this.chainId];
    throw new Error('Unsupported chain ID');
  }

  private static _cachedEther: { [chainId: number]: ExtendedMatic } = {};

  public static onChain(chainId: number): ExtendedMatic {
    return this._cachedEther[chainId] ?? (this._cachedEther[chainId] = new ExtendedMatic(chainId));
  }
}
