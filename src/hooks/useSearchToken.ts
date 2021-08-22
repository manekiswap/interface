import { Token } from '@uniswap/sdk-core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { utils } from '../constants/token';
import { selectors } from '../reducers';
import useActiveChainId from './useActiveChainId';
import useAllActiveTokens from './useAllActiveTokens';

export default function useSearchToken(input: string): Token[] {
  const chainId = useActiveChainId();
  const allTokenMap = useSelector(selectors.list.selectAllTokenMap);
  const activeUniqueTokens = useAllActiveTokens();

  return useMemo(() => {
    if (input === '') return Object.values(activeUniqueTokens).sort((a, b) => (utils.sortsBySymbol(a, b) ? 1 : 0));

    return Object.values(allTokenMap)
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
      .sort((a, b) => (utils.sortsBySymbol(a, b) ? 1 : 0));
  }, [activeUniqueTokens, allTokenMap, chainId, input]);
}
