import { Currency } from '@uniswap/sdk-core';
import { useMemo } from 'react';

import { ExtendedEther } from '../constants/extended-ether';
import useActiveChainId from './useActiveChainId';
import useToken from './useToken';

export default function useCurrency(address?: string): Currency | undefined {
  const chainId = useActiveChainId();
  const isETH = address?.toUpperCase() === 'ETH';
  const token = useToken(isETH ? undefined : address);
  const extendedEther = useMemo(() => (chainId ? ExtendedEther.onChain(chainId) : undefined), [chainId]);
  return isETH ? extendedEther : token;
}
