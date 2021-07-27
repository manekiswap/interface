import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../types';
import { UserState } from './types';

const initialState = (function () {
  return {
    theme: 'dark',
    multihop: false,
    slippage: 'auto',
  } as UserState;
})();

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleMultihop(state, action: PayloadAction<boolean>) {
      state.multihop = action.payload;
    },
    changeSlippage(state, action: PayloadAction<'auto' | number>) {
      if (action.payload === 'auto' || typeof action.payload === 'number') {
        state.slippage = action.payload;
      }
    },
  },
});

const selectors = (function () {
  const getState = (state: RootState) => state.user;

  const selectTheme = createSelector(getState, (state) => state.theme);
  const selectMultihop = createSelector(getState, (state) => state.multihop);
  const selectSlippage = createSelector(getState, (state) => state.slippage);

  return {
    selectTheme,
    selectMultihop,
    selectSlippage,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
