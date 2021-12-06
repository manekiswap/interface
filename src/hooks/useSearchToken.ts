import { getAddress, isAddress } from '@ethersproject/address';
import { Token } from '@manekiswap/sdk';
import { TokenInfo } from '@manekiswap/token-lists';
import { useCallback, useMemo } from 'react';

import { utils } from '../constants/token';
import { selectors } from '../reducers';
import { useAppSelector } from '../reducers/hooks';
import { SerializedToken } from '../reducers/token/types';
import useActiveWeb3React from './useActiveWeb3React';
import useAllActiveTokens from './useAllActiveTokens';

export default function useSearchToken(input: string): Token[] {
  const { chainId } = useActiveWeb3React();
  const allTokenMap = useAppSelector(selectors.list.selectAllTokenMap);
  const tokens = useAppSelector(selectors.token.selectTokens);

  const activeUniqueTokens = useAllActiveTokens();

  const search = useCallback(
    (tokenMap: { [address: string]: TokenInfo } | { [address: string]: SerializedToken }) => {
      return Object.values(tokenMap)
        .filter((token) => {
          if (token.chainId !== chainId) return false;

          const matchedName = token.name?.toLowerCase().includes(input.toLowerCase());
          const matchedSymbol = token.symbol?.toLowerCase().includes(input.toLowerCase());
          const matchedTags = token.tags?.filter((tag) => tag.toLowerCase().includes(input.toLowerCase()));

          if (matchedName) return true;
          if (matchedSymbol) return true;
          if (!!matchedTags) return matchedTags.length > 0;
          return false;
        })
        .map((token) => utils.fromSerializedToken(token))
        .sort((a, b) => (a.sortsBefore(b) ? 1 : 0));
    },
    [chainId, input],
  );

  return useMemo(() => {
    if (input === '') return Object.values(activeUniqueTokens).sort((a, b) => (a.sortsBefore(b) ? 1 : 0));

    let checksumedAddress: string | undefined;
    if (isAddress(input)) {
      checksumedAddress = getAddress(input.trim());
    }

    if (!!checksumedAddress && allTokenMap[checksumedAddress]) {
      return [utils.fromSerializedToken(allTokenMap[checksumedAddress])];
    }

    return [...search(tokens[chainId ?? -1] ?? {}), ...search(allTokenMap)];
  }, [activeUniqueTokens, allTokenMap, chainId, input, search, tokens]);
}
