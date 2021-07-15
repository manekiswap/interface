import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { keyBy, unionWith } from 'lodash';

import { DEFAULT_LIST_URLS_VALUES } from '../../constants/token-list';
import { isSameAddress } from '../../utils/addresses';
import { SerializedToken } from '../token/types';
import { RootState } from '../types';
import { ListState } from './types';

const initialState = (function () {
  const activeLists = DEFAULT_LIST_URLS_VALUES.filter((val) => val.active === true);
  const activeListIds = activeLists.map((val) => val.id);
  const tokens = activeListIds.reduce((memo, id) => ({ ...memo, [id]: [] }), {});

  return {
    listUrls: DEFAULT_LIST_URLS_VALUES,
    activeListIds: activeListIds,
    tokens,
  } as ListState;
})();

const { actions, reducer } = createSlice({
  name: 'list',
  initialState,
  reducers: {
    updateTokenList(
      state,
      action: PayloadAction<{ listId: string; logoURI?: string; name: string; tokens: SerializedToken[] }>,
    ) {
      const { listId, logoURI, name, tokens } = action.payload;
      const index = state.listUrls.findIndex((list) => list.id === listId);
      state.listUrls[index].logoURI = logoURI;
      state.listUrls[index].name = name;

      state.tokens[listId] = tokens.reduce((memo, token) => {
        return {
          ...memo,
          [token.address]: token,
        };
      }, {});
    },
    updateActiveList(state, action: PayloadAction<{ listId: string; active: boolean }>) {
      const { listId, active } = action.payload;
      state.activeListIds.slice();

      if (!active) {
        state.activeListIds = state.activeListIds.filter((id) => id !== listId);
        return;
      }

      const listWeight = state.listUrls.find((list) => list.id === listId)?.weight;
      if (listWeight === undefined) return;

      let added = false;

      const activeListIds: string[] = [];
      for (const id of state.activeListIds) {
        const weight = state.listUrls.find((list) => list.id === id)?.weight;
        if (weight === undefined) continue;
        if (listWeight > weight) {
          activeListIds.push(listId, id);
          added = true;
          break;
        } else activeListIds.push(id);
      }

      if (!added) activeListIds.push(listId);

      state.activeListIds = activeListIds;
    },
  },
});

const selectors = (function () {
  const getState = (state: RootState) => state.list;

  const selectListUrls = createSelector(getState, (state) => state.listUrls);
  const selectActiveListIds = createSelector(getState, (state) => state.activeListIds);
  const selectActiveListUrls = createSelector(selectListUrls, selectActiveListIds, (list, ids) => {
    return list.filter((val) => ids.indexOf(val.id) > -1);
  });

  const selectTokenCountMap = createSelector(getState, (state) => {
    return Object.keys(state.tokens).reduce((memo, listId) => {
      return { ...memo, [listId]: Object.keys(state.tokens[listId]).length };
    }, {} as { [listId: string]: number });
  });

  const selectAllTokens = createSelector(getState, (state) => {
    return Object.keys(state.tokens).reduce((memo, listId) => {
      return unionWith(memo, Object.values(state.tokens[listId]), (a, b) => isSameAddress(a.address, b.address));
    }, [] as SerializedToken[]);
  });

  const selectTokenMap = createSelector(getState, selectActiveListIds, (state, activeListIds) => {
    const tokens = activeListIds.reduce((memo, listId) => {
      return unionWith(memo, Object.values(state.tokens[listId]), (a, b) => isSameAddress(a.address, b.address));
    }, [] as SerializedToken[]);
    return keyBy(tokens, 'address');
  });

  const makeSelectDefaultLogoURI = (token: { address: string }) =>
    createSelector(getState, selectTokenMap, (state, tokenMap) => {
      const { address } = token;
      return tokenMap[address]?.logoURI;
    });

  const makeSelectListByToken = (address: string) =>
    createSelector(getState, (state) => {
      return Object.keys(state.tokens).reduce((memo, listId) => {
        const token = state.tokens[listId][address];
        return !!token ? [...memo, listId] : memo;
      }, [] as string[]);
    });

  return {
    selectListUrls,
    selectActiveListIds,
    selectActiveListUrls,
    selectTokenCountMap,
    selectAllTokens,
    selectTokenMap,
    makeSelectDefaultLogoURI,
    makeSelectListByToken,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
