import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Token } from '../constants/token';
import { selectors } from '../reducers';
import useActiveChainId from './useActiveChainId';

export default function useAllActiveTokens(): { [address: string]: Token } {
  const chainId = useActiveChainId();
  const activeUniqueTokens = useSelector(selectors.list.selectActiveUniqueTokens);

  return useMemo(
    () =>
      activeUniqueTokens.reduce<{ [address: string]: Token }>((memo, token) => {
        return token.chainId !== chainId ? memo : { ...memo, [token.address]: Token.fromTokenInfo(token) };
      }, {}),
    [activeUniqueTokens, chainId],
  );
}
