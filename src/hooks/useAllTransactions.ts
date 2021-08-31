import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../reducers';
import useActiveWeb3React from './useActiveWeb3React';

export default function useAllTransactions() {
  const { chainId } = useActiveWeb3React();
  const transactions = useSelector(selectors.transaction.selectTransactions);

  return useMemo(() => {
    return transactions[chainId ?? -1];
  }, [chainId, transactions]);
}
