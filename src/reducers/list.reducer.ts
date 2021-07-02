import { createSelector, createSlice } from '@reduxjs/toolkit';

import { DEFAULT_LIST_URLS, DEFAULT_LIST_URLS_VALUES } from '../constants/token-list';
import { AppState, ListState } from './types';

const initialState: ListState = (function () {
  return {
    activeListUrls: DEFAULT_LIST_URLS_VALUES.filter((value) => {
      return DEFAULT_LIST_URLS.indexOf(value.id) > -1;
    }),
  };
})();

const { actions, reducer } = createSlice({
  name: 'list',
  initialState,
  reducers: {},
});

const selectors = (function () {
  const getState = (state: AppState) => state.list;

  const selectListUrls = createSelector(getState, (state) => state.activeListUrls);

  return {
    selectListUrls,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
