import { Currency } from '@manekiswap/sdk';
import { useMemo } from 'react';

import { ExtendedMatic } from '../constants/extended-ether';
import useActiveWeb3React from './useActiveWeb3React';
import useToken from './useToken';

export default function useCurrency(address?: string): Currency | undefined {
  const { chainId } = useActiveWeb3React();
  const isMATIC = address?.toUpperCase() === 'MATIC';
  const token = useToken(isMATIC ? undefined : address);
  const extendedNative = useMemo(() => (chainId ? ExtendedMatic.onChain(chainId) : undefined), [chainId]);
  return isMATIC ? extendedNative : token;
}
