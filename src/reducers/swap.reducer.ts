import { createSelector, createSlice } from '@reduxjs/toolkit';

import { AppState, SwapState } from './types';

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
  reducers: {},
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
