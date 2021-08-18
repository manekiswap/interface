import { Currency, NativeCurrency } from '@uniswap/sdk-core';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectors } from '../reducers';

export default function useDefaultLogoURIs(token: Currency) {
  const selectDefaultLogoURIs = useCallback(
    selectors.list.makeSelectDefaultLogoURIs(token instanceof NativeCurrency ? { address: '' } : token),
    [token],
  );
  const logoURIs = useSelector(selectDefaultLogoURIs);
  return useMemo(() => logoURIs, [logoURIs]);
}
