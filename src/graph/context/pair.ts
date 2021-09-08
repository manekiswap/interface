import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GraphContext, PairState } from './types';

export const initialState: PairState = {
  byAddress: {},
};

export const actions = {};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {};
