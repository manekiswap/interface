import { Token } from '@uniswap/sdk-core';

import { FACTORY_ADDRESS } from '../constants/addresses';
import { computePairAddress } from '../constants/pair';

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toLiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  if (tokenA.chainId !== tokenB.chainId) throw new Error('Not matching chain IDs');
  if (tokenA.equals(tokenB)) throw new Error('Tokens cannot be equal');
  if (!FACTORY_ADDRESS[tokenA.chainId]) throw new Error('No factory address on this chain');

  return new Token(
    tokenA.chainId,
    computePairAddress({ factoryAddress: FACTORY_ADDRESS[tokenA.chainId], tokenA, tokenB }),
    18,
    'MLP',
    'Maneki LP Token',
  );
}
