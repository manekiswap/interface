import { useCallback, useEffect } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useInterval from '../../hooks/useInterval';
import { useIsMounted } from '../../hooks/useIsMounted';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import fetchTokenList from '../../thunks/fetchTokenList';
import { selectors } from '..';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function Updater(): null {
  const { chainId, library } = useActiveWeb3React();
  const isWindowVisible = useIsWindowVisible();
  const isMounted = useIsMounted();
  const dispatch = useAppDispatch();

  // get all loaded lists
  const lists = useAppSelector(selectors.list.selectAllLists);
  const tokens = useAppSelector(selectors.list.selectAllTokens);

  const fetchAllListsCallback = useCallback(() => {
    if (!isMounted || !isWindowVisible) return;
    if (chainId === undefined) return;

    Object.keys(lists).forEach((url) =>
      dispatch(fetchTokenList({ url, chainId }))
        .unwrap()
        .catch((error) => console.warn('interval list fetching error', error)),
    );
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
        dispatch(fetchTokenList({ url, chainId }))
          .unwrap()
          .catch((error) => console.warn('list added fetching error', error));
      }
    });
  }, [chainId, dispatch, isMounted, lists, tokens]);

  return null;
}
