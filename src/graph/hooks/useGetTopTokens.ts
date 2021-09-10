import { useCallback } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import getTopTokens from '../data/getTopTokens';
import { useClients } from './useClients';
import useEthPrice from './useEthPrice';

export default function useGetTopTokens() {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const dispatch = graphs.useDispatch();
  const prices = useEthPrice();

  return useCallback(async () => {
    if (!chainId || !prices) return;

    // get top tokens
    const topTokens = await getTopTokens(prices, blockClient, dataClient);
    topTokens && dispatch(graphs.actions.token.updateTopTokens({ topTokens: topTokens as any, chainId }));
  }, [blockClient, chainId, dataClient, dispatch, prices]);
}
