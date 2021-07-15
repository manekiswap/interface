import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../types';
import { ApplicationState } from './types';

const initialState = (function () {
  return {
    blockNumber: {},
  } as ApplicationState;
})();

const { actions, reducer } = createSlice({
  name: 'application',
  initialState,
  reducers: {},
});

const selectors = (function () {
  const getState = (state: RootState) => state.application;

  const selectBlockNumberMap = createSelector(getState, (state) => state.blockNumber);
  return {
    selectBlockNumberMap,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
