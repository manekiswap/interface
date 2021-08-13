import invariant from 'tiny-invariant';

import { Token } from './token';
import { WETH9 } from './weth9';

class Ether extends Token {
  protected constructor(chainId: number) {
    super(chainId, '', 18, 'ETH', 'Ether');
  }

  public get wrapped(): Token {
    const weth9 = WETH9[this.chainId];
    invariant(!!weth9, 'WRAPPED');
    return weth9;
  }

  private static _etherCache: { [chainId: number]: Ether } = {};

  public static onChain(chainId: number): Ether {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Ether(chainId));
  }

  public equals(other: Token): boolean {
    return other.isNative && other.chainId === this.chainId;
  }
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WETH9) return WETH9[this.chainId];
    throw new Error('Unsupported chain ID');
  }

  private static _cachedEther: { [chainId: number]: ExtendedEther } = {};

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedEther[chainId] ?? (this._cachedEther[chainId] = new ExtendedEther(chainId));
  }
}
