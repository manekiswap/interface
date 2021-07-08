import { createSelector, createSlice } from '@reduxjs/toolkit';

import { SupportedChainId } from '../constants/chains';
import { AppState, UserState } from './types';

const initialState = (function () {
  return {
    currentChainId: SupportedChainId.MAINNET,
    theme: 'dark',
  } as UserState;
})();

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

const selectors = (function () {
  const getState = (state: AppState) => state.user;

  const selectCurrentChainId = createSelector(getState, (state) => state.currentChainId);
  const selectTheme = createSelector(getState, (state) => state.theme);

  return {
    selectCurrentChainId,
    selectTheme,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
