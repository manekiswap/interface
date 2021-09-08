import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SupportedChainId } from '../../constants/chains';
import { GraphContext, UserState } from './types';

export const initialState: UserState = {
  ofChain: {},
};

export const actions = {};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {};
