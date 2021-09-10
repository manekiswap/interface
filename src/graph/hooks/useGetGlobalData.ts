import { useCallback } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import getAllPairs from '../data/getAllPairs';
import getAllTokens from '../data/getAllTokens';
import getGlobalData from '../data/getGlobalData';
import { useClients } from './useClients';
import useEthPrice from './useEthPrice';

/**
 * Hook that fetches overview data, plus all tokens and pairs for search
 */
export default function useGetGlobalData() {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const dispatch = graphs.useDispatch();

  const prices = useEthPrice();

  return useCallback(async () => {
    if (!chainId || !prices) return;

    const globalData = await getGlobalData(prices.currentDayEthPrice, prices.lastDayEthPrice, blockClient, dataClient);
    globalData && dispatch(graphs.actions.global.updateGlobalData({ factoryData: globalData, chainId }));

    const allPairs = await getAllPairs(dataClient);
    allPairs && dispatch(graphs.actions.global.updateAllPairs({ allPairs, chainId }));

    const allTokens = await getAllTokens(dataClient);
    allTokens && dispatch(graphs.actions.global.updateAllTokens({ allTokens, chainId }));
  }, [blockClient, chainId, dataClient, dispatch, prices]);
}
