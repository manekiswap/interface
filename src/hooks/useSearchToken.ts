import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { app } from '../reducers';

export default function useSearchToken(input: string) {
  const chainId = useSelector(app.selectors.user.selectCurrentChainId);
  const selectAllTokens = useCallback(app.selectors.list.makeSelectAllTokens(chainId), []);
  const allTokens = useSelector(selectAllTokens);

  const result = allTokens.filter((token) => {
    const matchedName = token.name?.toLowerCase().includes(input.toLowerCase());
    const matchedTags = token.tags?.filter((tag) => tag.toLowerCase().includes(input.toLowerCase()));

    if (matchedName) return true;
    if (!!matchedTags) return matchedTags.length > 0;
    return false;
  });

  return result;
}
