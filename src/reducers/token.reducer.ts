import { createSelector, createSlice } from '@reduxjs/toolkit';

import { AppState, TokenState } from './types';

const initialState = (function () {
  return {
    tokens: {},
    pairs: {},
  } as TokenState;
})();

const { actions, reducer } = createSlice({
  name: 'token',
  initialState,
  reducers: {},
});

const selectors = (function () {
  const getState = (state: AppState) => state.token;

  const selectPairs = createSelector(getState, (state) => state.pairs);
  const makeSelectTokens = (chainId: number) => createSelector(getState, (state) => state.tokens[chainId]);

  return {
    selectPairs,
    makeSelectTokens,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
