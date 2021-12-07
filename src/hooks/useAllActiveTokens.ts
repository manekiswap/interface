import { Token } from '@manekiswap/sdk';
import { useMemo } from 'react';

import { utils } from '../constants/token';
import { selectors } from '../reducers';
import { useAppSelector } from '../reducers/hooks';
import { SerializedToken } from '../reducers/token/types';
import useAppChainId from './useAppChainId';

export default function useAllActiveTokens(): { [address: string]: Token } {
  const appChainId = useAppChainId();
  const activeTokenMap = useAppSelector(selectors.list.selectActiveTokenMap);
  const tokens = useAppSelector(selectors.token.selectTokens);

  const addedSerializedTokens = useMemo(
    () => tokens[appChainId] || ({} as { [address: string]: SerializedToken }),
    [appChainId, tokens],
  );

  return useMemo(() => {
    const addedTokens = Object.values(addedSerializedTokens).map((token) => utils.fromSerializedToken(token));
    const listsTokens = Object.values(activeTokenMap)
      .filter((token) => token.chainId === appChainId)
      .map((token) => utils.fromTokenInfo(token));
    return [...listsTokens, ...addedTokens].reduce((memo, token) => {
      if (!memo[token.address]) memo[token.address] = token;
      return memo;
    }, {});
  }, [activeTokenMap, addedSerializedTokens, appChainId]);
}
