import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GraphContext, PairState } from './types';

type TokenData = {
  id: string;
  derivedETH: string;
  name: string;
  symbol: string;
  totalLiquidity: string;
};

export const initialState: PairState = {
  ofChain: {},
};

export const actions = {
  updateTopPairs: createAction<{
    topPairs: {
      id: string;
      createdAtTimestamp: number;
      liquidityChangeUSD: number;
      oneDayVolumeUSD: number;
      oneDayVolumeUntracked: number;
      oneWeekVolumeUSD: number;
      oneWeekVolumeUntracked: number;
      reserve0: string;
      reserve1: string;
      reserveETH: string;
      reserveUSD: string;
      token0Price: string;
      token1Price: string;
      totalSupply: string;
      trackedReserveETH: number;
      trackedReserveUSD: number;
      txCount: string;
      untrackedVolumeUSD: string;
      volumeChangeUSD: number;
      volumeChangeUntracked: number;
      volumeUSD: number;
      token0: TokenData;
      token1: TokenData;
    }[];
    chainId: number;
  }>('pair/updateTopPairs'),
};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {
  builder.addCase(actions.updateTopPairs, (state, { payload: { topPairs, chainId } }) => {
    state.pair.ofChain[chainId] = {
      ...state.token.ofChain[chainId],
      byAddress: {
        ...state.token.ofChain[chainId],
        ...topPairs.reduce((memo, pair) => {
          return { ...memo, [pair.id]: pair };
        }, {}),
      },
    };
  });
};
