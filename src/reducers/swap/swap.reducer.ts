import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../types';
import { ShortToken, SwapState } from './types';

const initialState = (function () {
  return {} as SwapState;
})();

const { actions, reducer } = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    reset(state) {
      state.token0 = undefined;
      state.token1 = undefined;
    },
    update(state, action: PayloadAction<{ field: 'token0' | 'token1'; token: ShortToken }>) {
      const {
        payload: { field, token },
      } = action;
      state[field] = token;
    },
  },
});

const selectors = (function () {
  const getState = (state: RootState) => state.swap;

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
