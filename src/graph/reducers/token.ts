import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GraphContext, TokenState } from './types';

type TokenDayData = {
  id: string;
  derivedETH: string;
  name: string;
  symbol: string;
  totalLiquidity: string;
  tradeVolume: string;
  tradeVolumeUSD: string;
  txCount: string;
  untrackedVolumeUSD: string;
};

export const initialState: TokenState = {
  ofChain: {},
};

export const actions = {
  updateTopTokens: createAction<{
    topTokens: {
      id: string;
      name: string;
      symbol: string;
      derivedETH: string;
      oneDayTxns: number;
      oneDayVolumeUSD: number;
      priceChangeUSD: number;
      priceUSD: number;
      totalLiquidity: number;
      totalLiquidityUSD: number;
      liquidityChangeUSD: number;
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
    state.token.ofChain[chainId] = {
      ...state.token.ofChain[chainId],
      byAddress: {
        ...state.token.ofChain[chainId],
        ...topTokens.reduce((memo, token) => {
          return { ...memo, [token.id]: token };
        }, {}),
      },
    };
  });
};
