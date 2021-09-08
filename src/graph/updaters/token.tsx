import { useEffect } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import getTopTokens from '../data/getTopTokens';
import { useClients } from '../hooks/useClients';
import useEthPrice from '../hooks/useEthPrice';

export default function TokenUpdater(): null {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const dispatch = graphs.useDispatch();
  const prices = useEthPrice();

  useEffect(() => {
    async function getData() {
      if (!chainId || !prices) return;

      // get top pairs for overview list
      const topTokens = await getTopTokens(prices, blockClient, dataClient);
      topTokens && dispatch(graphs.actions.token.updateTopTokens({ topTokens: topTokens as any, chainId }));
    }

    getData();
  }, [blockClient, chainId, dataClient, dispatch, prices]);
  return null;
}
