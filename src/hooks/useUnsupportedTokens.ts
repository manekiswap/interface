import { Token } from '@manekiswap/sdk';
import { useMemo } from 'react';

import { utils } from '../constants/token';
import { UNSUPPORTED_LIST_URLS } from '../constants/token-lists';
import { selectors } from '../reducers';
import { useAppSelector } from '../reducers/hooks';

export default function useUnsupportedTokens(): { [address: string]: Token } {
  const allTokens = useAppSelector(selectors.list.selectAllTokens);
  return useMemo(
    () =>
      Object.keys(allTokens).reduce<{ [address: string]: Token }>((memo, listUrl) => {
        if (UNSUPPORTED_LIST_URLS.indexOf(listUrl) === -1) return memo;
        const map = allTokens[listUrl].reduce<{ [address: string]: Token }>(
          (aggr, token) => ({ ...aggr, [token.address]: utils.fromTokenInfo(token) }),
          {},
        );
        return { ...memo, ...map };
      }, {}),
    [allTokens],
  );
}
