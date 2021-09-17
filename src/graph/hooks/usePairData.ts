import { isAddress } from '@ethersproject/address';
import { useEffect } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import { getBulkPairData } from '../data/getBulkPairData';
import { useClients } from './useClients';
import useEthPrice from './useEthPrice';

export default function usePairData(address: string) {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const prices = useEthPrice();

  const dispatch = graphs.useDispatch();
  const pairnMap = graphs.useSelector((state) => state.pair.ofChain[chainId ?? -1].byAddress);
  const pairData = pairnMap?.[address];

  useEffect(() => {
    async function fetch() {
      if (!chainId || !prices) return;
      const data = await getBulkPairData([address], prices, blockClient, dataClient);
      data && dispatch(graphs.actions.pair.updatePair({ pair: data[0] as any, chainId }));
    }

    if (pairnMap && !pairData && isAddress(address)) {
      fetch();
    }
  }, [address, blockClient, chainId, dataClient, dispatch, pairData, pairnMap, prices]);

  return pairData;
}
