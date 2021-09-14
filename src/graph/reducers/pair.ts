import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import initializeState from '../utils/initializeState';
import { GraphContext, PairData, PairState } from './types';

export const initialState: PairState = {
  ofChain: initializeState(),
};

export const actions = {
  updateTopPairs: createAction<{ topPairs: PairData[]; chainId: number }>('pair/updateTopPairs'),
};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {
  builder.addCase(actions.updateTopPairs, (state, { payload: { topPairs, chainId } }) => {
    state.pair.ofChain[chainId].byAddress = topPairs.reduce((memo, pair) => {
      return { ...memo, [pair.id]: pair };
    }, {});
  });
};
