import { useEffect } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import getTopPairs from '../data/getTopPair';
import { useClients } from '../hooks/useClients';
import useEthPrice from '../hooks/useEthPrice';

export default function PairUpdater(): null {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const dispatch = graphs.useDispatch();
  const prices = useEthPrice();

  useEffect(() => {
    async function getData() {
      if (!chainId || !prices) return;

      // get data for every pair in list
      const topPairs = await getTopPairs(prices, blockClient, dataClient);
      topPairs && dispatch(graphs.actions.pair.updateTopPairs({ topPairs: topPairs as any, chainId }));
    }
    getData();
  }, [blockClient, chainId, dataClient, dispatch, prices]);
  return null;
}
