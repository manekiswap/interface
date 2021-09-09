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
  updateTransactions: createAction<{
    transactions: {
      mints: {
        transaction: {
          id: string;
          timestamp: string;
        };
        pair: {
          token0: {
            id: string;
            symbol: string;
          };
          token1: {
            id: string;
            symbol: string;
          };
        };
        to: string;
        liquidity: string;
        amount0: string;
        amount1: string;
        amountUSD: string;
      }[];
      burns: {
        transaction: {
          id: string;
          timestamp: string;
        };
        pair: {
          token0: {
            id: string;
            symbol: string;
          };
          token1: {
            id: string;
            symbol: string;
          };
        };
        se: string;
        liquidity: string;
        amount0: string;
        amount1: string;
        amountUSD: string;
      }[];
      swaps: {
        transaction: {
          id: string;
          timestamp: string;
        };
        pair: {
          token0: {
            id: string;
            symbol: string;
          };
          token1: {
            id: string;
            symbol: string;
          };
        };
        amount0In: string;
        amount0Out: string;
        amount1In: string;
        amount1Out: string;
        amountUSD: string;
        to: string;
      }[];
    };
    chainId: number;
  }>('global/updateTransactions'),
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
    })
    .addCase(actions.updateTransactions, (state, { payload: { transactions, chainId } }) => {
      state.global.ofChain[chainId] = {
        ...(state.global.ofChain[chainId] || {}),
        transactions,
      };
    });
};
