import { createSelector, createSlice } from '@reduxjs/toolkit';

import { AppState, PoolState } from './types';

const initialState = (function () {
  return {} as PoolState;
})();

const { actions, reducer } = createSlice({
  name: 'pool',
  initialState,
  reducers: {},
});

const selectors = (function () {
  const getState = (state: AppState) => state.pool;

  return {};
})();

export default {
  actions,
  reducer,
  selectors,
};
