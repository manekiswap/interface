import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Token } from '../constants/token';
import { selectors } from '../reducers';

export default function useSwapPair(): { token0?: Token; token1?: Token } {
  const { token0, token1 } = useSelector(selectors.swap.selectSwapPair);

  return useMemo(() => {
    return {
      token0: token0 && Token.fromShortToken(token0),
      token1: token1 && Token.fromShortToken(token1),
    };
  }, [token0, token1]);
}
