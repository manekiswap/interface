import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Token } from '../constants/token';
import { app } from '../reducers';

export default function useDefaultLogoURI(token: Token) {
  const selectDefaultLogoURI = useCallback(app.selectors.list.makeSelectDefaultLogoURI(token), [token]);

  const logoURI = useSelector(selectDefaultLogoURI);
  return logoURI;
}
