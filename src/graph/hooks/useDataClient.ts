import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { SupportedChainId } from '../../constants/chains';
import useActiveChainId from '../../hooks/useActiveChainId';
import { client } from '../client';

export function useDataClient(): ApolloClient<NormalizedCacheObject> {
  const chainId = useActiveChainId();
  switch (chainId) {
    case SupportedChainId.MAINNET:
      return client;
    default:
      return client;
  }
}
