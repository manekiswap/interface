import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useFetchListCallback from '../../hooks/useFetchListCallback';
import useInterval from '../../hooks/useInterval';
import { useIsMounted } from '../../hooks/useIsMounted';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import { selectors } from '..';

export default function Updater(): null {
  const { library } = useActiveWeb3React();
  const isWindowVisible = useIsWindowVisible();
  const isMounted = useIsMounted();

  // get all loaded lists
  const lists = useSelector(selectors.list.selectAllLists);
  const tokens = useSelector(selectors.list.selectAllTokens);

  const fetchList = useFetchListCallback();
  const fetchAllListsCallback = useCallback(() => {
    if (!isMounted || !isWindowVisible) return;
    Object.keys(lists).forEach((url) =>
      fetchList(url).catch((error) => console.debug('interval list fetching error', error)),
    );
  }, [fetchList, isMounted, isWindowVisible, lists]);

  // fetch all lists every 10 minutes, but only after we initialize library
  useInterval(fetchAllListsCallback, library ? 1000 * 60 * 10 : null);

  // whenever a list is not loaded and not loading, try again to load it
  useEffect(() => {
    if (!isMounted) return;
    Object.keys(lists).forEach((url) => {
      const list = lists[url];
      if (tokens[url].length === 0 && !list.requestId && !list.error) {
        fetchList(url).catch((error) => console.debug('list added fetching error', error));
      }
    });
  }, [fetchList, isMounted, lists, tokens]);

  return null;
}
