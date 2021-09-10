import { useCallback } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import getGlobalTransactions from '../data/getGlobalTransactions';
import { useClients } from './useClients';

export default function useGetGlobalTransactions() {
  const { chainId } = useActiveWeb3React();
  const { dataClient } = useClients();

  const dispatch = graphs.useDispatch();

  return useCallback(async () => {
    if (!chainId) return;

    const txns = await getGlobalTransactions(dataClient);
    txns && dispatch(graphs.actions.global.updateTransactions({ transactions: txns, chainId }));
  }, [chainId, dataClient, dispatch]);
}
