import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'react-use';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import { actions } from '..';

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React();
  const dispatch = useDispatch();

  const windowVisible = useIsWindowVisible();
  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((s) => {
        if (chainId === s.chainId) {
          if (typeof s.blockNumber !== 'number') return { chainId, blockNumber };
          return {
            chainId,
            blockNumber: Math.max(blockNumber, s.blockNumber),
          };
        }
        return s;
      });
    },
    [chainId, setState],
  );

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined;

    setState({ chainId, blockNumber: null });

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error));

    library.on('block', blockNumberCallback);
    return () => {
      library.removeListener('block', blockNumberCallback);
    };
  }, [blockNumberCallback, chainId, library, windowVisible]);

  useDebounce(
    () => {
      const { chainId, blockNumber } = state;
      if (!chainId || !blockNumber || !windowVisible) return;

      dispatch(
        actions.application.updateBlockNumber({
          chainId,
          blockNumber,
        }),
      );
    },
    100,
    [dispatch, state.chainId, state.blockNumber, windowVisible],
  );

  return null;
}
