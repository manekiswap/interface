import { Ether, Token } from '@uniswap/sdk-core';

import { EXTENDED_WETH } from './weth9';

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in EXTENDED_WETH) return EXTENDED_WETH[this.chainId];
    throw new Error('Unsupported chain ID');
  }

  private static _cachedEther: { [chainId: number]: ExtendedEther } = {};

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedEther[chainId] ?? (this._cachedEther[chainId] = new ExtendedEther(chainId));
  }
}
