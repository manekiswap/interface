import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import getClients from '../client';

export function useClients(): {
  dataClient?: ApolloClient<NormalizedCacheObject>;
  blockClient?: ApolloClient<NormalizedCacheObject>;
  healthClients?: ApolloClient<NormalizedCacheObject>;
} {
  const { chainId } = useActiveWeb3React();
  return useMemo(() => getClients(chainId), [chainId]);
}
