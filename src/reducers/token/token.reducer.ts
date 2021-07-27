import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../types';
import { SerializedToken, TokenState } from './types';

const initialState = (function () {
  return {
    tokens: {},
    pairs: {},
  } as TokenState;
})();

const { actions, reducer } = createSlice({
  name: 'token',
  initialState,
  reducers: {
    addToken(state, action: PayloadAction<SerializedToken>) {
      const token = action.payload;
      if (!state.tokens[token.chainId]) {
        state.tokens[token.chainId] = {};
      }
      state.tokens[token.chainId][token.address] = token;
    },
  },
});

const selectors = (function () {
  const getState = (state: RootState) => state.token;

  const selectPairs = createSelector(getState, (state) => state.pairs);
  const selectTokens = createSelector(getState, (state) => state.tokens);

  return {
    selectPairs,
    selectTokens,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
