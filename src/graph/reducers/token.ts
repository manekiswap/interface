import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import initializeState from '../utils/initializeState';
import { GraphContext, TokenDayData, TokenState } from './types';

export const initialState: TokenState = {
  ofChain: initializeState(),
};

export const actions = {
  updateTopTokens: createAction<{
    topTokens: {
      id: string;
      name: string;
      symbol: string;
      derivedETH: string;
      liquidityChangeUSD: number;
      oneDayTxns: number;
      oneDayVolumeUSD: number;
      priceChangeUSD: number;
      priceUSD: number;
      totalLiquidity: number;
      totalLiquidityUSD: number;
      tradeVolume: string;
      tradeVolumeUSD: string;
      txCount: string;
      txnChange: number;
      untrackedVolumeUSD: string;
      volumeChangeUSD: number;
      oneDayData: TokenDayData;
      twoDayData: TokenDayData;
    }[];
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
