import { Token } from '@manekiswap/sdk';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { utils } from '../constants/token';
import { selectors } from '../reducers';
import { SerializedToken } from '../reducers/token/types';
import useActiveWeb3React from './useActiveWeb3React';

export default function useAllActiveTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React();
  const activeTokenMap = useSelector(selectors.list.selectActiveTokenMap);
  const tokens = useSelector(selectors.token.selectTokens);

  const addedSerializedTokens = useMemo(
    () => tokens[chainId ?? -1] || ({} as { [address: string]: SerializedToken }),
    [chainId, tokens],
  );

  return useMemo(() => {
    const addedTokens = Object.values(addedSerializedTokens).map((token) => utils.fromSerializedToken(token));
    const listsTokens = Object.values(activeTokenMap)
      .filter((token) => token.chainId === chainId)
      .map((token) => utils.fromTokenInfo(token));
    return [...listsTokens, ...addedTokens].reduce((memo, token) => ({ ...memo, [token.address]: token }), {});
  }, [activeTokenMap, addedSerializedTokens, chainId]);
}
