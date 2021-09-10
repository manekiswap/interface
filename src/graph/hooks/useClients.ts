import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { SupportedChainId } from '../../constants/chains';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { blockClient, client } from '../client';

export function useClients(): {
  dataClient: ApolloClient<NormalizedCacheObject>;
  blockClient: ApolloClient<NormalizedCacheObject>;
} {
  const dataClient = useDataClient();
  const blockClient = useBlockClient();
  return {
    dataClient,
    blockClient,
  };
}

export function useDataClient(): ApolloClient<NormalizedCacheObject> {
  const { chainId } = useActiveWeb3React();
  switch (chainId) {
    case SupportedChainId.MAINNET:
      return client;
    default:
      return client;
  }
}

export function useBlockClient(): ApolloClient<NormalizedCacheObject> {
  const { chainId } = useActiveWeb3React();
  switch (chainId) {
    case SupportedChainId.MAINNET:
      return blockClient;
    default:
      return blockClient;
  }
}
