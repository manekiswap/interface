import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { SupportedChainId } from '../../constants/chains';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { blockClient } from '../client';

export function useBlockClient(): ApolloClient<NormalizedCacheObject> {
  const { chainId } = useActiveWeb3React();
  switch (chainId) {
    case SupportedChainId.MAINNET:
      return blockClient;
    default:
      return blockClient;
  }
}
