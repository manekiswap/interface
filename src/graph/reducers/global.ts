import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { FactoryData, GlobalState, GraphContext } from './types';

export const initialState: GlobalState = {
  ofChain: {},
};

export const actions = {
  updateGlobalData: createAction<{ factoryData: FactoryData; chainId: number }>('global/updateGlobalData'),
  updateChartData: createAction<{
    daily: {
      id: string;
      date: number;
      dailyVolumeETH: string;
      dailyVolumeUSD: string;
      totalLiquidityETH: string;
      totalLiquidityUSD: string;
    }[];
    weekly: { date: number; weeklyVolumeUSD: number }[];
    chainId: number;
  }>('global/updateChartData'),
  updateAllPairs: createAction<{
    allPairs: {
      id: string;
      token0: {
        id: string;
        symbol: string;
        name: string;
      };
      token1: {
        id: string;
        symbol: string;
        name: string;
      };
    }[];
    chainId: number;
  }>('global/updateAllPairs'),
  updateAllTokens: createAction<{
    allTokens: { id: string; name: string; symbol: string; totalLiquidity: string }[];
    chainId: number;
  }>('global/updateAllTokens'),
};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {
  builder
    .addCase(actions.updateGlobalData, (state, { payload: { factoryData, chainId } }) => {
      state.global.ofChain[chainId] = {
        ...state.global.ofChain[chainId],
        factoryData,
      };
    })
    .addCase(actions.updateChartData, (state, { payload: { daily, weekly, chainId } }) => {
      state.global.ofChain[chainId] = {
        ...(state.global.ofChain[chainId] || {}),
        chartData: { daily, weekly },
      };
    })
    .addCase(actions.updateAllPairs, (state, { payload: { allPairs, chainId } }) => {
      state.global.ofChain[chainId] = {
        ...(state.global.ofChain[chainId] || {}),
        allPairs,
      };
    })
    .addCase(actions.updateAllTokens, (state, { payload: { allTokens, chainId } }) => {
      state.global.ofChain[chainId] = {
        ...(state.global.ofChain[chainId] || {}),
        allTokens,
      };
    });
};
