import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { app } from '../reducers';
import { isAddress } from '../utils/addresses';
import { useActiveWeb3React } from './useActiveWeb3React';

export default function useSearchTokenAddress(input: string) {
  const { chainId } = useActiveWeb3React();
  console.log(chainId);
  const userChainId = useSelector(app.selectors.user.selectCurrentChainId);

  const isValid = isAddress(input);

  return isValid;
}
