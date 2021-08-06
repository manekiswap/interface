import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useInterval from '../../hooks/useInterval';
import { useIsMounted } from '../../hooks/useIsMounted';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import fetchList from '../../thunks/fetchList';
import { selectors } from '..';

export default function Updater(): null {
  const { chainId, library } = useActiveWeb3React();
  const isWindowVisible = useIsWindowVisible();
  const isMounted = useIsMounted();
  const dispatch = useDispatch();

  // get all loaded lists
  const lists = useSelector(selectors.list.selectAllLists);
  const tokens = useSelector(selectors.list.selectAllTokens);

  const fetchAllListsCallback = useCallback(() => {
    if (!isMounted || !isWindowVisible) return;
    if (chainId === undefined) return;

    Object.keys(lists).forEach((url) => dispatch(fetchList({ url, chainId })));
  }, [chainId, dispatch, isMounted, isWindowVisible, lists]);

  // fetch all lists every 10 minutes, but only after we initialize library
  useInterval(fetchAllListsCallback, library ? 1000 * 60 * 10 : null);

  // whenever a list is not loaded and not loading, try again to load it
  useEffect(() => {
    if (!isMounted) return;
    if (chainId === undefined) return;

    Object.keys(lists).forEach((url) => {
      const list = lists[url];
      if (tokens[url].length === 0 && !list.requestId && !list.error) {
        dispatch(fetchList({ url, chainId }));
      }
    });
  }, [chainId, dispatch, isMounted, lists, tokens]);

  return null;
}
