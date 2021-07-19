import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Token } from '../constants/token';
import { selectors } from '../reducers';
import useActiveChainId from './useActiveChainId';

export default function useAllActiveTokens(): { [address: string]: Token } {
  const chainId = useActiveChainId();
  const tokenMap = useSelector(selectors.list.selectActiveTokenMap);

  return useMemo(
    () =>
      Object.values(tokenMap).reduce<{ [address: string]: Token }>((memo, token) => {
        return token.chainId !== chainId ? memo : { ...memo, [token.address]: Token.fromTokenInfo(token) };
      }, {}),
    [chainId, tokenMap],
  );
}
