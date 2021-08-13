import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { actions, selectors } from '../reducers';
import { useAppDispatch } from '../reducers/hooks';

export function useSubgraphStatus(): [
  {
    available: boolean | null;
    syncedBlock: number | undefined;
    headBlock: number | undefined;
  },
  (available: boolean | null, syncedBlock: number | undefined, headBlock: number | undefined) => void,
] {
  const dispatch = useAppDispatch();
  const status = useSelector(selectors.application.selectSubgraphStatus);

  const update = useCallback(
    (available: boolean | null, syncedBlock: number | undefined, headBlock: number | undefined) => {
      dispatch(actions.application.updateSubgraphStatus({ available, syncedBlock, headBlock }));
    },
    [dispatch],
  );
  return [status, update];
}
