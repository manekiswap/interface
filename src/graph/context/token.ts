import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GraphContext, TokenState } from './types';

export const initialState: TokenState = {
  byAddress: {},
};

export const actions = {};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {};
