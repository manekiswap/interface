import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../types';
import { MulticallState } from './types';
import { Call, toCallKey } from './utils';

const initialState = (function () {
  return {
    callResults: {},
    callListeners: {},
  } as MulticallState;
})();

const { actions, reducer } = createSlice({
  name: 'multicall',
  initialState,
  reducers: {
    addMulticallListeners(
      state,
      action: PayloadAction<{
        calls: Call[];
        chainId: number;
        options: { blocksPerFetch: number };
      }>,
    ) {
      const {
        calls,
        chainId,
        options: { blocksPerFetch },
      } = action.payload;
      if (!state.callListeners[chainId]) {
        state.callListeners[chainId] = {};
      }
      calls.forEach((call) => {
        const callKey = toCallKey(call);
        state.callListeners[chainId][callKey] = state.callListeners[chainId][callKey] ?? {};
        state.callListeners[chainId][callKey][blocksPerFetch] =
          (state.callListeners[chainId][callKey][blocksPerFetch] ?? 0) + 1;
      });
    },
    removeMulticallListeners(
      state,
      action: PayloadAction<{
        calls: Call[];
        chainId: number;
        options: { blocksPerFetch: number };
      }>,
    ) {
      const {
        calls,
        chainId,
        options: { blocksPerFetch },
      } = action.payload;
      if (!state.callListeners[chainId]) {
        return;
      }

      calls.forEach((call) => {
        const callKey = toCallKey(call);
        if (!state.callListeners[chainId][callKey] || !state.callListeners[chainId][callKey][blocksPerFetch]) return;

        if (state.callListeners[chainId][callKey][blocksPerFetch] === 1) {
          delete state.callListeners[chainId][callKey][blocksPerFetch];
        } else {
          state.callListeners[chainId][callKey][blocksPerFetch]--;
        }
      });
    },
  },
});

const selectors = (function () {
  const getState = (state: RootState) => state.multicall;

  const selectCallResults = createSelector(getState, (state) => state.callResults);

  return {
    selectCallResults,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
