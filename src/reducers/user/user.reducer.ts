import { createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../types';
import { UserState } from './types';

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
  const getState = (state: RootState) => state.user;

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
