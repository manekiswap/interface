import { keyBy, unionWith } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Token } from '../constants/token';
import { selectors } from '../reducers';
import { SerializedToken } from '../reducers/token/types';
import { isSameAddress } from '../utils/addresses';
import useActiveChainId from './useActiveChainId';

export default function useAllActiveTokens(): { [address: string]: Token } {
  const chainId = useActiveChainId();
  const activeUniqueTokens = useSelector(selectors.list.selectActiveUniqueTokens);
  const tokens = useSelector(selectors.token.selectTokens);

  const addedSerializedTokens = useMemo(
    () => tokens[chainId] || ({} as { [address: string]: SerializedToken }),
    [chainId, tokens],
  );

  return useMemo(() => {
    const addedTokens = Object.values(addedSerializedTokens).map((token) => Token.fromSerializedToken(token));
    const listsTokens = activeUniqueTokens
      .filter((token) => token.chainId === chainId)
      .map((token) => Token.fromTokenInfo(token));
    const combinedTokens = unionWith(addedTokens, listsTokens, (a, b) => isSameAddress(a.address, b.address));
    return keyBy(combinedTokens, 'address');
  }, [activeUniqueTokens, addedSerializedTokens, chainId]);
}
