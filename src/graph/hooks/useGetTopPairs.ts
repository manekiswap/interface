import { useCallback } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import getTopPairs from '../data/getTopPair';
import { useClients } from './useClients';
import useEthPrice from './useEthPrice';

export default function useGetTopPairs() {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const dispatch = graphs.useDispatch();
  const prices = useEthPrice();

  return useCallback(async () => {
    if (!chainId || !prices) return;

    // get top pairs
    const topPairs = await getTopPairs(prices, blockClient, dataClient);
    topPairs && dispatch(graphs.actions.pair.updateTopPairs({ topPairs: topPairs as any, chainId }));
  }, [blockClient, chainId, dataClient, dispatch, prices]);
}
