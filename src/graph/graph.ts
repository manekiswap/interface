import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { SupportedChainId } from '../constants/chains';
import useActiveChainId from '../hooks/useActiveChainId';
import { actions, selectors } from '../reducers';
import { useAppDispatch } from '../reducers/hooks';
import { blockClient, client } from './client';

// returns a function that allows adding a popup
export function useSubgraphStatus(): [
  {
    available: boolean | null;
    syncedBlock: number | undefined;
    headBlock: number | undefined;
  },
  (available: boolean | null, syncedBlock: number | undefined, headBlock: number | undefined) => void,
] {
  const dispatch = useAppDispatch();
  const status = useSelector(selectors.application.selectSubgraphStatus);

  const update = useCallback(
    (available: boolean | null, syncedBlock: number | undefined, headBlock: number | undefined) => {
      dispatch(actions.application.updateSubgraphStatus({ available, syncedBlock, headBlock }));
    },
    [dispatch],
  );
  return [status, update];
}

// get the apollo client related to the active network
export function useDataClient(): ApolloClient<NormalizedCacheObject> {
  const chainId = useActiveChainId();
  switch (chainId) {
    case SupportedChainId.MAINNET:
      return client;
    default:
      return client;
  }
}

// get the apollo client related to the active network for fetching blocks
export function useBlockClient(): ApolloClient<NormalizedCacheObject> {
  const chainId = useActiveChainId();
  switch (chainId) {
    case SupportedChainId.MAINNET:
      return blockClient;
    default:
      return blockClient;
  }
}

// Get all required subgraph clients
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
