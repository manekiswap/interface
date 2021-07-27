import { useSelector } from 'react-redux';

import { selectors } from '../reducers';

export default function useUserConfig() {
  const multihop = useSelector(selectors.user.selectMultihop);
  const slippage = useSelector(selectors.user.selectSlippage);
  const transactionDeadline = useSelector(selectors.user.selectTransactionDeadline);
  return { multihop, slippage, transactionDeadline };
}
