import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import initializeState from '../utils/initializeState';
import { GraphContext, UserState } from './types';

export const initialState: UserState = {
  ofChain: initializeState(),
};

export const actions = {};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {};
