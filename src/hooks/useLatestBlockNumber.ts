import { useSelector } from 'react-redux';

import { selectors } from '../reducers';
import useActiveChainId from './useActiveChainId';

export default function useLatestBlockNumber() {
  const chainId = useActiveChainId();
  return useSelector(selectors.application.selectBlockNumberMap)[chainId];
}
