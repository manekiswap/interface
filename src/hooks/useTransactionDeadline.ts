import { BigNumber } from '@ethersproject/bignumber';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../reducers';
import useCurrentBlockTimestamp from './useCurrentBlockTimestamp';

// combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction
export default function useTransactionDeadline(): BigNumber | undefined {
  const ttl = useSelector(selectors.user.selectTransactionDeadline);

  const blockTimestamp = useCurrentBlockTimestamp();
  return useMemo(() => {
    if (blockTimestamp && ttl) return blockTimestamp.add(100_000_000);
    return undefined;
  }, [blockTimestamp, ttl]);
}
