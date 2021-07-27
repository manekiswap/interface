import { useSelector } from 'react-redux';

import { selectors } from '../reducers';

export default function useUserConfig() {
  const multihop = useSelector(selectors.user.selectMultihop);
  const slippage = useSelector(selectors.user.selectSlippage);
  return { multihop, slippage };
}
