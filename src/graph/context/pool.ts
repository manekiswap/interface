import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SupportedChainId } from '../../constants/chains';
import { TickProcessed } from '../data/pools/tickData';
import { Transaction } from '../types';
import { GraphContext, PoolChartEntry, PoolData, PoolsState } from './types';

export const initialState: PoolsState = {
  byAddress: {
    [SupportedChainId.MAINNET]: {},
    [SupportedChainId.RINKEBY]: {},
    [SupportedChainId.ROPSTEN]: {},
    [SupportedChainId.GÖRLI]: {},
    [SupportedChainId.KOVAN]: {},
    [SupportedChainId.LOCAL]: {},
  },
};

export const actions = {
  updatePoolData: createAction<{ pools: PoolData[]; chainId: number }>('pools/updatePoolData'),
  addPoolKeys: createAction<{ poolAddresses: string[]; chainId: number }>('pool/addPoolKeys'),
  updatePoolChartData:
    createAction<{ poolAddress: string; chartData: PoolChartEntry[]; chainId: number }>('pool/updatePoolChartData'),
  updatePoolTransactions:
    createAction<{ poolAddress: string; transactions: Transaction[]; chainId: number }>('pool/updatePoolTransactions'),
  updateTickData: createAction<{
    poolAddress: string;
    tickData?: { ticksProcessed: TickProcessed[]; feeTier: string; tickSpacing: number; activeTickIdx: number };
    chainId: number;
  }>('pool/updateTickData'),
};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {
  builder.addCase(actions.updatePoolData, (state, { payload: { pools, chainId } }) => {
    pools.forEach((poolData) => {
      state.pool.byAddress[chainId][poolData.address] = {
        ...state.pool.byAddress[chainId][poolData.address],
        data: poolData,
        lastUpdated: Date.now().valueOf(),
      };
    });
  });
  builder.addCase(actions.addPoolKeys, (state, { payload: { poolAddresses, chainId } }) => {
    poolAddresses.forEach((address) => {
      if (!state.pool.byAddress[chainId][address]) {
        state.pool.byAddress[chainId][address] = {
          data: undefined,
          chartData: undefined,
          transactions: undefined,
          lastUpdated: undefined,
          tickData: undefined,
        };
      }
    });
  });
  builder.addCase(actions.updatePoolChartData, (state, { payload: { poolAddress, chartData, chainId } }) => {
    state.pool.byAddress[chainId][poolAddress] = {
      ...state.pool.byAddress[chainId][poolAddress],
      chartData: chartData,
    };
  });
  builder.addCase(actions.updatePoolTransactions, (state, { payload: { poolAddress, transactions, chainId } }) => {
    state.pool.byAddress[chainId][poolAddress] = { ...state.pool.byAddress[chainId][poolAddress], transactions };
  });
  builder.addCase(actions.updateTickData, (state, { payload: { poolAddress, tickData, chainId } }) => {
    state.pool.byAddress[chainId][poolAddress] = { ...state.pool.byAddress[chainId][poolAddress], tickData };
  });
};
