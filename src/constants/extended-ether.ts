import { Ether, Token } from '@manekiswap/sdk';

import { WETH9_EXTENDED } from './weth9';

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
