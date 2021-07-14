import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { app } from '../reducers';
import { List } from '../reducers/types';

export default function useListUrls(): Array<List & { active: boolean; tokenCount: number }> {
  const listUrls = useSelector(app.selectors.list.selectListUrls);
  const tokenCountMap = useSelector(app.selectors.list.selectTokenCountMap);
  const activeListIds = useSelector(app.selectors.list.selectActiveListIds);
  const actualLists = useMemo(
    () =>
      listUrls
        .filter((list) => tokenCountMap[list.id] > 0)
        .sort((a, b) => b.weight - a.weight)
        .map((list) => {
          const active = activeListIds.indexOf(list.id) > -1;
          return { ...list, active: active, tokenCount: tokenCountMap[list.id] };
        }),
    [activeListIds, listUrls, tokenCountMap],
  );

  return actualLists;
}
