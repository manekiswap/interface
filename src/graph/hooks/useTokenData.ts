import { isAddress } from '@ethersproject/address';
import { useEffect } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import graphs from '..';
import { getTokenData } from '../data/getTokenData';
import { useClients } from './useClients';
import useEthPrice from './useEthPrice';

export default function useTokenData(address: string) {
  const { chainId } = useActiveWeb3React();
  const { blockClient, dataClient } = useClients();

  const prices = useEthPrice();

  const dispatch = graphs.useDispatch();
  const tokenMap = graphs.useSelector((state) => state.token.ofChain[chainId ?? -1].byAddress);
  const tokenData = tokenMap?.[address];

  useEffect(() => {
    async function fetch() {
      if (!chainId || !prices) return;
      const data = await getTokenData(address, prices, blockClient, dataClient);
      data && dispatch(graphs.actions.token.updateToken({ token: data, chainId }));
    }

    if (tokenMap && !tokenData && isAddress(address)) {
      fetch();
    }
  }, [address, blockClient, chainId, dataClient, dispatch, prices, tokenData, tokenMap]);

  return tokenData;
}
