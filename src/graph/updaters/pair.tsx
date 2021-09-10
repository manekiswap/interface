import { useEffect } from 'react';

import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import useGetTopPairs from '../hooks/useGetTopPairs';

export default function PairUpdater(): null {
  const getTopPairs = useGetTopPairs();
  const isWindowVisible = useIsWindowVisible();

  useEffect(() => {
    if (!isWindowVisible) return;

    // refresh list on focusing window
    // need to review cache policy
    getTopPairs();
  }, [getTopPairs, isWindowVisible]);
  return null;
}
