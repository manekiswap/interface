import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { UNSUPPORTED_LIST_URLS } from '../constants/token-lists';
import { sortByListPriority } from '../functions/list';
import { selectors } from '../reducers';
import { List } from '../reducers/list/types';

export default function useListUrls(): Array<List & { url: string; active: boolean; tokenCount: number }> {
  const allLists = useSelector(selectors.list.selectAllLists);
  const tokenCountMap = useSelector(selectors.list.selectTokenCountMap);
  const activeListUrls = useSelector(selectors.list.selectActiveListUrls);

  const actualLists = useMemo(
    () =>
      Object.keys(allLists)
        .filter((url) => {
          // no unsupported list
          if (UNSUPPORTED_LIST_URLS.includes(url)) return false;

          // no fetching or errored list
          if (allLists[url].requestId || allLists[url].error) return false;

          return true;
        })
        .sort(sortByListPriority)
        .map((url) => {
          const active = activeListUrls.indexOf(url) > -1;
          return { ...allLists[url], url, active: active, tokenCount: tokenCountMap[url] };
        }),
    [activeListUrls, allLists, tokenCountMap],
  );

  return actualLists;
}
