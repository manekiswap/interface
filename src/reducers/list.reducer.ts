import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_LIST_URLS_VALUES } from '../constants/token-list';
import { AppState, ListState, ListToken } from './types';

const tokenAdapter = createEntityAdapter<ListToken>({
  selectId: (token) => token.address,
  sortComparer: (token0, token1) => {
    if (token0?.symbol !== undefined && token1?.symbol !== undefined) {
      return token0.symbol.localeCompare(token1.symbol);
    }
    return 0;
  },
});

const initialState = (function () {
  return {
    listUrls: DEFAULT_LIST_URLS_VALUES,
    customListUrls: [],
    activeListIds: DEFAULT_LIST_URLS_VALUES.filter((val) => val.active === true).map((val) => val.id),
    tokens: tokenAdapter.getInitialState(),
  } as ListState;
})();

const { actions, reducer } = createSlice({
  name: 'list',
  initialState,
  reducers: {
    updateTokens(state, action: PayloadAction<{ tokens: ListToken[] }>) {
      tokenAdapter.upsertMany(state.tokens, action.payload.tokens);
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
  const selectTokens = createSelector(getState, (state) => tokenAdapter.getSelectors().selectAll(state.tokens));

  const makeSelectDefaultLogoUrl = (address?: string) =>
    createSelector(getState, (state) => {
      if (!address) return undefined;
      return tokenAdapter.getSelectors().selectById(state.tokens, address)?.logoURI;
    });

  return {
    selectListUrls,
    selectActiveListUrls,
    selectTokens,
    makeSelectDefaultLogoUrl,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
