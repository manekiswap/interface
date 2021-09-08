import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { GlobalData, GlobalState, GraphContext } from './types';

export const initialState: GlobalState = {
  ofChain: {},
};

export const actions = {
  updateGlobalData: createAction<{ globalData: GlobalData; chainId: number }>('global/updateGlobalData'),
  updateChartData: createAction<{
    daily: Array<{
      id: string;
      date: number;
      dailyVolumeETH: string;
      dailyVolumeUSD: string;
      totalLiquidityETH: string;
      totalLiquidityUSD: string;
    }>;
    weekly: Array<{ date: number; weeklyVolumeUSD: number }>;
    chainId: number;
  }>('global/updateChartData'),
};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {
  builder
    .addCase(actions.updateGlobalData, (state, { payload: { globalData, chainId } }) => {
      state.global.ofChain[chainId] = {
        ...state.global.ofChain[chainId],
        globalData: globalData,
      };
    })
    .addCase(actions.updateChartData, (state, { payload: { daily, weekly, chainId } }) => {
      state.global.ofChain[chainId] = {
        ...(state.global.ofChain[chainId] || {}),
        chartData: { daily, weekly },
      };
    });
};
