import { useSelector } from 'react-redux';

import { selectors } from '../reducers';

export default function useMultihop() {
  return useSelector(selectors.user.selectMultihop);
}
