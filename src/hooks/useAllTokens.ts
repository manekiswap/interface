import { useSelector } from 'react-redux';

import { app } from '../reducers';
import useActiveWeb3React from './useActiveWeb3React';

export default function useAllTokens() {
  const { chainId } = useActiveWeb3React();
  const tokenMap = useSelector(app.selectors.list.selectTokenMap);
}
