import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../types';
import { PoolState } from './types';

const initialState = (function () {
  return {} as PoolState;
})();

const { actions, reducer } = createSlice({
  name: 'pool',
  initialState,
  reducers: {},
});

const selectors = (function () {
  const getState = (state: RootState) => state.pool;

  return {};
})();

export default {
  actions,
  reducer,
  selectors,
};
