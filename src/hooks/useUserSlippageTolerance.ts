import { Percent } from '@manekiswap/sdk';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../reducers';

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
export function useUserSlippageTolerance(): Percent | 'auto' {
  const slippage = useSelector(selectors.user.selectSlippage);

  return useMemo(() => (slippage === 'auto' ? 'auto' : new Percent(slippage, 10_000)), [slippage]);
}
