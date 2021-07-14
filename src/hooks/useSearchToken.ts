import { useSelector } from 'react-redux';

import { Token } from '../constants/token';
import { app } from '../reducers';
import useActiveWeb3React from './useActiveWeb3React';

export default function useSearchToken(input: string) {
  const { chainId } = useActiveWeb3React();

  const allTokens = useSelector(app.selectors.list.selectAllTokens);

  return allTokens
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
    .map((token) => Token.fromSerializedToken(token))
    .sort((a, b) => (a.sortsBySymbol(b) ? 1 : 0));
}
