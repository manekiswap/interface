import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState, ShortToken, SwapState } from './types';

const initialState = (function () {
  return {
    token0: {
      address: '',
      symbol: 'ETH',
    },
  } as SwapState;
})();

const { actions, reducer } = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    reset(state) {
      state.token0 = {
        address: '',
        symbol: 'ETH',
      };
      state.token1 = undefined;
    },
    update(state, action: PayloadAction<{ field: 'token0' | 'token1'; token: ShortToken }>) {
      const { field, token } = action.payload;
      state[field] = token;
    },
  },
});

const selectors = (function () {
  const getState = (state: AppState) => state.swap;

  const selectSwapPair = createSelector(getState, (state) => ({
    token0: state.token0,
    token1: state.token1,
  }));

  const selectSwapValue = createSelector(getState, (state) => ({
    value: state.value,
  }));

  return {
    selectSwapPair,
    selectSwapValue,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
