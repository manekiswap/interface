import { useEffect } from 'react';

import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import useGetTopTokens from '../hooks/useGetTopTokens';

export default function TokenUpdater(): null {
  const getTopTokens = useGetTopTokens();
  const isWindowVisible = useIsWindowVisible();

  // useEffect(() => {
  //   if (!isWindowVisible) return;

  //   // refresh list on focusing window
  //   // need to review cache policy
  //   getTopTokens();
  // }, [getTopTokens, isWindowVisible]);

  useEffect(() => {
    getTopTokens();
  }, [getTopTokens]);
  return null;
}
