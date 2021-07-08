import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_LIST_URLS_VALUES } from '../constants/token-list';
import { AppState, ListState, SerializedToken } from './types';

const initialState = (function () {
  const activeLists = DEFAULT_LIST_URLS_VALUES.filter((val) => val.active === true);
  const activeListIds = activeLists.map((val) => val.id);
  const tokens = activeListIds.reduce((memo, id) => ({ ...memo, [id]: [] }), {});

  return {
    listUrls: DEFAULT_LIST_URLS_VALUES,
    customListUrls: [],
    activeListIds: activeListIds,
    tokens,
  } as ListState;
})();

const { actions, reducer } = createSlice({
  name: 'list',
  initialState,
  reducers: {
    updateTokens(state, action: PayloadAction<{ listId: string; tokens: SerializedToken[] }>) {
      const { listId, tokens } = action.payload;
      state.tokens[listId] = tokens.reduce((memo, token) => {
        return {
          ...memo,
          [token.address]: token,
        };
      }, {});
    },
  },
});

const selectors = (function () {
  const getState = (state: AppState) => state.list;

  const selectListUrls = createSelector(getState, (state) => state.listUrls);
  const selectActiveListIds = createSelector(getState, (state) => state.activeListIds);
  const selectActiveListUrls = createSelector(selectListUrls, selectActiveListIds, (list, ids) => {
    return list.filter((val) => ids.indexOf(val.id) > -1);
  });

  const makeSelectTokenMap = (chainId: number) =>
    createSelector(getState, selectActiveListIds, (state, activeListIds) => {
      return activeListIds.reduce((memo, listId) => {
        const tokens = state.tokens[listId];
        const applicableTokens = Object.keys(state.tokens[listId])
          .filter((address) => memo[address] === undefined && tokens[address].chainId === chainId)
          .reduce((m, address) => ({ ...m, [address]: tokens[address] }), {});
        return { ...memo, ...applicableTokens };
      }, {} as { [address: string]: SerializedToken });
    });

  const makeSelectDefaultLogoUrl = (token: { chainId: number; address: string }) =>
    createSelector(getState, makeSelectTokenMap(token.chainId), (state, tokenMap) => {
      const { address } = token;
      return tokenMap[address]?.logoURI;
    });

  return {
    selectListUrls,
    selectActiveListUrls,
    makeSelectTokenMap,
    makeSelectDefaultLogoUrl,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
