import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GraphContext, PairState } from './types';

export const initialState: PairState = {
  ofChain: {},
};

export const actions = {};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {};
