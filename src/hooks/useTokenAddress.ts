import { Currency } from '@manekiswap/sdk';
import { useMemo } from 'react';

import { ExtendedEther } from '../constants/extended-ether';
import useActiveWeb3React from './useActiveWeb3React';
import useToken from './useToken';

export default function useCurrency(address?: string): Currency | undefined {
  const { chainId } = useActiveWeb3React();
  const isETH = address?.toUpperCase() === 'ETH';
  const token = useToken(isETH ? undefined : address);
  const extendedEther = useMemo(() => (chainId ? ExtendedEther.onChain(chainId) : undefined), [chainId]);
  return isETH ? extendedEther : token;
}
