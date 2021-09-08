import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SupportedChainId } from '../../constants/chains';
import { GraphContext, UserState } from './types';

export const initialState: UserState = {
  byAddress: {
    [SupportedChainId.MAINNET]: {},
    [SupportedChainId.RINKEBY]: {},
    [SupportedChainId.ROPSTEN]: {},
    [SupportedChainId.GÖRLI]: {},
    [SupportedChainId.KOVAN]: {},
    [SupportedChainId.LOCAL]: {},
  },
};

export const actions = {};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {};
