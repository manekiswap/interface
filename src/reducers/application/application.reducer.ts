import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    updateBlockNumber(state, action: PayloadAction<{ chainId: number; blockNumber: number }>) {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    },
  },
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
