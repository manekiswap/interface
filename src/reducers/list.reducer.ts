import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_LIST_URLS_VALUES } from '../constants/token-list';
import { AppState, ListState, ListToken } from './types';

// combile address + chainId as tokenId
function selectTokenId(token: { address: string; chainId: number }) {
  return `${token.address} - ${token.chainId}`;
}

const tokenAdapter = createEntityAdapter<ListToken>({
  selectId: selectTokenId,
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

  const makeSelectTokens = (chainId: number) =>
    createSelector(getState, (state) =>
      tokenAdapter
        .getSelectors()
        .selectAll(state.tokens)
        .filter((token) => token.chainId === chainId),
    );

  const makeSelectDefaultLogoUrl = (token?: { chainId: number; address: string }) =>
    createSelector(getState, (state) => {
      if (!token) return undefined;
      const { chainId, address } = token;
      return tokenAdapter.getSelectors().selectById(state.tokens, selectTokenId({ chainId, address }))?.logoURI;
    });

  return {
    selectListUrls,
    selectActiveListUrls,
    makeSelectTokens,
    makeSelectDefaultLogoUrl,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
