import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../types';
import { SerializedPair, SerializedToken, TokenState } from './types';
import { pairKey } from './utils';

const initialState = (function () {
  return {
    tokens: {},
    pairs: {},
    timestamp: Date.now().valueOf(),
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
    addSerializedPair(state, action: PayloadAction<{ serializedPair: SerializedPair }>) {
      const { serializedPair } = action.payload;
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const chainId = serializedPair.token0.chainId;
        state.pairs[chainId] = state.pairs[chainId] || {};
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair;
      }
      state.timestamp = Date.now().valueOf();
    },
    removeSerializedPair(
      state,
      action: PayloadAction<{
        chainId: number;
        tokenAAddress: string;
        tokenBAddress: string;
      }>,
    ) {
      const { chainId, tokenAAddress, tokenBAddress } = action.payload;

      if (state.pairs[chainId]) {
        // just delete both keys if either exists
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)];
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)];
      }
      state.timestamp = Date.now().valueOf();
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
