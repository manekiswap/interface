import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { SupportedChainId } from '../../constants/chains';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { client } from '../client';

export function useDataClient(): ApolloClient<NormalizedCacheObject> {
  const { chainId } = useActiveWeb3React();
  switch (chainId) {
    case SupportedChainId.MAINNET:
      return client;
    default:
      return client;
  }
}
