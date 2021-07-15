import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Token } from '../constants/token';
import { selectors } from '../reducers';
import useActiveChainId from './useActiveChainId';

export default function useAllTokens(): { [address: string]: Token } {
  const chainId = useActiveChainId();
  const allTokens = useSelector(selectors.list.selectAllTokens);

  return useMemo(
    () =>
      allTokens.reduce((memo, token) => {
        return token.chainId !== chainId ? memo : { ...memo, [token.address]: Token.fromSerializedToken(token) };
      }, {} as { [address: string]: Token }),
    [allTokens, chainId],
  );
}
