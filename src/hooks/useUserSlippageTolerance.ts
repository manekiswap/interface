import { Percent } from '@uniswap/sdk-core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../reducers';

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
export function useUserSlippageTolerance(): Percent | 'auto' {
  const userSlippageTolerance = useSelector(selectors.user.selectSlippage);

  return useMemo(
    () => (userSlippageTolerance === 'auto' ? 'auto' : new Percent(userSlippageTolerance, 10_000)),
    [userSlippageTolerance],
  );
}
