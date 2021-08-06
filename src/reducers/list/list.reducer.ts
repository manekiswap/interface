import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_ACTIVE_LIST_URLS, DEFAULT_LIST_OF_LISTS } from '../../constants/token-lists';
import { TokenInfo } from '../../constants/tokens/types';
import { sortByListPriority } from '../../functions/list';
import fetchList from '../../thunks/fetchList';
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
  extraReducers: (builder) => {
    builder.addCase(fetchList.pending, (state, action) => {
      const {
        requestId,
        arg: { url },
      } = action.meta;
      state.lists[url].requestId = requestId;
      state.lists[url].error = undefined;
    });
    builder.addCase(fetchList.fulfilled, (state, action) => {
      const {
        requestId,
        arg: { url },
      } = action.meta;
      const {
        list: { name, timestamp, version, keywords, tags, logoURI, tokens },
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
    });
    builder.addCase(fetchList.rejected, (state, action) => {
      const {
        requestId,
        arg: { url },
      } = action.meta;
      const { error } = action;
      if (state.lists[url].requestId !== requestId) return;

      state.lists[url].requestId = undefined;
      state.lists[url].error = error.message;
    });
  },
  reducers: {
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

  const selectActiveTokenMap = createSelector(selectActiveListUrls, selectAllTokens, (activeListUrls, allTokens) => {
    return activeListUrls.reduce<{ [address: string]: TokenInfo }>((memo, url) => {
      const tokenMap = allTokens[url].reduce((map, token) => ({ ...map, [token.address]: token }), {});
      return { ...memo, ...tokenMap };
    }, {});
  });

  const selectAllTokenMap = createSelector(selectAllLists, selectAllTokens, (allLists, allTokens) => {
    return Object.keys(allLists).reduce<{ [address: string]: TokenInfo }>((memo, url) => {
      const tokenMap = allTokens[url].reduce((map, token) => ({ ...map, [token.address]: token }), {});
      return { ...memo, ...tokenMap };
    }, {});
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
    selectActiveTokenMap,
    selectAllTokenMap,
    makeSelectDefaultLogoURIs,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
