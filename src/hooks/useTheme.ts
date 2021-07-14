import { useSelector } from 'react-redux';

import { app } from '../reducers';

export default function useTheme() {
  const theme = useSelector(app.selectors.user.selectTheme);
  return theme;
}
