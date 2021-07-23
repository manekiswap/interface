import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { keyBy, unionWith } from 'lodash';

import { DEFAULT_ACTIVE_LIST_URLS, DEFAULT_LIST_OF_LISTS } from '../../constants/token-lists';
import { TokenInfo, TokenList } from '../../constants/tokens/types';
import { sortByListPriority } from '../../functions/list';
import { isSameAddress } from '../../utils/addresses';
import { RootState } from '../types';
import { ListState } from './types';

const initialState = (function () {
  const lists = DEFAULT_LIST_OF_LISTS.reduce((memo, url) => ({ ...memo, [url]: {} }), {});
  const tokens = DEFAULT_LIST_OF_LISTS.reduce((memo, url) => ({ ...memo, [url]: [] }), {});

  return {
    activeListUrls: DEFAULT_ACTIVE_LIST_URLS,
    lists,
    tokens,
  } as ListState;
})();

const { actions, reducer } = createSlice({
  name: 'list',
  initialState,
  reducers: {
    pendingFetchingTokenList(state, action: PayloadAction<{ url: string; requestId: string }>) {
      const { url, requestId } = action.payload;

      state.lists[url].requestId = requestId;
      state.lists[url].error = undefined;
    },
    fulfilledFetchingTokenList(
      state,
      action: PayloadAction<{ url: string; requestId: string; tokenList: TokenList; update: boolean }>,
    ) {
      const {
        url,
        requestId,
        tokenList: { name, timestamp, version, keywords, tags, logoURI, tokens },
        update,
      } = action.payload;
      if (!state.lists[url].requestId || state.lists[url].requestId !== requestId) return;

      state.lists[url] = {
        name,
        timestamp,
        version,
        keywords,
        tags,
        logoURI,
      };

      if (update) {
        state.tokens[url] = tokens;
      }
    },
    rejectFetchingTokenList(state, action: PayloadAction<{ url: string; requestId: string; error: string }>) {
      const { url, requestId, error } = action.payload;
      if (state.lists[url].requestId !== requestId) return;

      state.lists[url].requestId = undefined;
      state.lists[url].error = error;
    },
    updateActiveList(state, action: PayloadAction<{ url: string; active: boolean }>) {
      const { url, active } = action.payload;
      if (!active) {
        state.activeListUrls = state.activeListUrls.filter((activeUrl) => url !== activeUrl);
        return;
      }

      state.activeListUrls.push(url);
      state.activeListUrls.sort(sortByListPriority);
    },
  },
});

const selectors = (function () {
  const getState = (state: RootState) => state.list;

  const selectAllLists = createSelector(getState, (state) => state.lists);

  const selectAllTokens = createSelector(getState, (state) => state.tokens);

  const selectActiveListUrls = createSelector(getState, (state) => state.activeListUrls);

  const selectTokenCountMap = createSelector(getState, (state) => {
    return Object.keys(state.tokens).reduce<{ [url: string]: number }>((memo, url) => {
      return { ...memo, [url]: state.tokens[url].length };
    }, {});
  });

  const selectActiveUniqueTokens = createSelector(
    selectAllTokens,
    selectActiveListUrls,
    (allTokens, activeListUrls) => {
      return activeListUrls.reduce<TokenInfo[]>((memo, url) => {
        return unionWith(memo, allTokens[url], (a, b) => isSameAddress(a.address, b.address));
      }, []);
    },
  );

  const selectAllUniqueTokens = createSelector(selectAllTokens, (allTokens) => {
    return Object.keys(allTokens).reduce<TokenInfo[]>((memo, url) => {
      return unionWith(memo, allTokens[url], (a, b) => isSameAddress(a.address, b.address));
    }, []);
  });

  const makeSelectDefaultLogoURIs = (token: { address: string }) =>
    createSelector(selectAllTokens, (allTokens) => {
      const logoURIs: string[] = [];
      const { address } = token;
      for (const url in allTokens) {
        const foundToken = allTokens[url].find((t) => t.address === address);
        if (!!foundToken && !!foundToken.logoURI) {
          logoURIs.push(foundToken.logoURI);
          continue;
        }
      }
      return logoURIs;
    });

  return {
    selectAllLists,
    selectAllTokens,
    selectActiveListUrls,
    selectTokenCountMap,
    selectActiveUniqueTokens,
    selectAllUniqueTokens,
    makeSelectDefaultLogoURIs,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
