import { useSelector } from 'react-redux';

import { selectors } from '../reducers';

export default function useTheme() {
  const theme = useSelector(selectors.user.selectTheme);
  return theme;
}
