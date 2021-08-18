import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';
import { Token } from '@uniswap/sdk-core';

import { FACTORY_ADDRESSES } from '../constants/addresses';

export const INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f';

export const computePairAddress = ({
  factoryAddress,
  tokenA,
  tokenB,
}: {
  factoryAddress: string;
  tokenA: Token;
  tokenB: Token;
}): string => {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks
  return getCreate2Address(
    factoryAddress,
    keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
    INIT_CODE_HASH,
  );
};

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toLiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  if (tokenA.chainId !== tokenB.chainId) throw new Error('Not matching chain IDs');
  if (tokenA.equals(tokenB)) throw new Error('Tokens cannot be equal');
  if (!FACTORY_ADDRESSES[tokenA.chainId]) throw new Error('No factory address on this chain');

  return new Token(
    tokenA.chainId,
    computePairAddress({ factoryAddress: FACTORY_ADDRESSES[tokenA.chainId], tokenA, tokenB }),
    18,
    'MNK-LP',
    'Manekiswap LP',
  );
}
