import { createSelector, createSlice } from '@reduxjs/toolkit';

import { AppState, TokenState } from './types';

const initialState: TokenState = (function () {
  return {
    tokens: {},
    pairs: {},
  };
})();

const { actions, reducer } = createSlice({
  name: 'token',
  initialState,
  reducers: {},
});

const selectors = (function () {
  const getState = (state: AppState) => state.token;

  const selectTokens = createSelector(getState, (state) => state.tokens);
  const selectPairs = createSelector(getState, (state) => state.pairs);

  return {
    selectTokens,
    selectPairs,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
