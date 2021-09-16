import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import initializeState from '../utils/initializeState';
import { GraphContext, TokenData, TokenState } from './types';

export const initialState: TokenState = {
  ofChain: initializeState(),
};

export const actions = {
  updateTopTokens: createAction<{
    topTokens: TokenData[];
    chainId: number;
  }>('token/updateTopTokens'),
};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {
  builder.addCase(actions.updateTopTokens, (state, { payload: { topTokens, chainId } }) => {
    state.token.ofChain[chainId].byAddress = topTokens.reduce((memo, token) => {
      return { ...memo, [token.id]: token };
    }, {});
  });
};
