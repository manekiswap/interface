import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { SupportedChainId } from '../../constants/chains';
import useActiveChainId from '../../hooks/useActiveChainId';
import { blockClient } from '../client';

export function useBlockClient(): ApolloClient<NormalizedCacheObject> {
  const chainId = useActiveChainId();
  switch (chainId) {
    case SupportedChainId.MAINNET:
      return blockClient;
    default:
      return blockClient;
  }
}
