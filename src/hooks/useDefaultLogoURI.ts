import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Token } from '../constants/token';
import { selectors } from '../reducers';

export default function useDefaultLogoURIs(token: Token) {
  const selectDefaultLogoURIs = useCallback(selectors.list.makeSelectDefaultLogoURIs(token), [token]);
  const logoURIs = useSelector(selectDefaultLogoURIs);
  return useMemo(() => logoURIs, [logoURIs]);
}
