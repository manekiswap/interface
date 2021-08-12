import { Token } from './token';
import { WETH9 } from './weth9';

export class ExtendedEther extends Token {
  public get wrapped(): Token {
    if (this.chainId in WETH9) return WETH9[this.chainId];
    throw new Error('Unsupported chain ID');
  }

  private static _cachedEther: { [chainId: number]: ExtendedEther } = {};

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedEther[chainId] ?? (this._cachedEther[chainId] = new ExtendedEther(chainId, '', 18, 'ETH', 'Ether'))
    );
  }
}
