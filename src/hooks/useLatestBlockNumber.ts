import { useSelector } from 'react-redux';

import { selectors } from '../reducers';
import useActiveWeb3React from './useActiveWeb3React';

export default function useLatestBlockNumber() {
  const { chainId } = useActiveWeb3React();
  return useSelector(selectors.application.selectBlockNumberMap)[chainId ?? -1];
}
