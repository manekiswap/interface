import { createSelector, createSlice } from '@reduxjs/toolkit';

import { AppState, UserState } from './types';

const initialState = (function () {
  return {
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

  const selectTheme = createSelector(getState, (state) => state.theme);

  return {
    selectTheme,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};
