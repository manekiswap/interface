import { useEffect } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import getAllPairs from '../data/getAllPairs';
import getAllTokens from '../data/getAllTokens';
import getGlobalData from '../data/getGlobalData';
import getGlobalTransactions from '../data/getGlobalTransactions';
import { useClients } from '../hooks/useClients';
import useEthPrice from '../hooks/useEthPrice';

export default function GlobalUpdater(): null {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const dispatch = graphs.useDispatch();

  const prices = useEthPrice();

  useEffect(() => {
    async function fetch() {
      const globalData = await getGlobalData(
        chainId ?? -1,
        prices.currentDayEthPrice,
        prices.lastDayEthPrice,
        blockClient!,
        dataClient!,
      );
      globalData &&
        dispatch(graphs.actions.global.updateGlobalData({ factoryData: globalData, chainId: chainId ?? -1 }));

      const allPairs = await getAllPairs(dataClient!);
      allPairs && dispatch(graphs.actions.global.updateAllPairs({ allPairs, chainId: chainId ?? -1 }));

      const allTokens = await getAllTokens(dataClient!);
      allTokens && dispatch(graphs.actions.global.updateAllTokens({ allTokens, chainId: chainId ?? -1 }));

      const txns = await getGlobalTransactions(dataClient!);
      txns && dispatch(graphs.actions.global.updateTransactions({ transactions: txns, chainId: chainId ?? -1 }));
    }

    if (blockClient && dataClient && Object.keys(prices).length > 0) {
      fetch();
    }
  }, [blockClient, chainId, dataClient, dispatch, prices]);

  return null;
}
