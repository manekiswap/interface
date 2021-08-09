import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SupportedChainId } from '../../constants/chains';
import { ChartDayData, Transaction } from '../types';
import { GraphContext, ProtocolData, ProtocolState } from './types';

export const initialState: ProtocolState = {
  [SupportedChainId.MAINNET]: {
    data: undefined,
    chartData: undefined,
    transactions: undefined,
    lastUpdated: undefined,
  },
};

export const actions = {
  updateProtocolData: createAction<{ protocolData: ProtocolData; chainId: number }>('protocol/updateProtocolData'),
  updateChartData: createAction<{ chartData: ChartDayData[]; chainId: number }>('protocol/updateChartData'),
  updateTransactions: createAction<{ transactions: Transaction[]; chainId: number }>('protocol/updateTransactions'),
};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {
  builder
    .addCase(actions.updateProtocolData, (state, { payload: { protocolData, chainId } }) => {
      state.protocol[chainId].data = protocolData;
      state.protocol[chainId].lastUpdated = Date.now().valueOf();
    })
    .addCase(actions.updateChartData, (state, { payload: { chartData, chainId } }) => {
      state.protocol[chainId].chartData = chartData;
    })
    .addCase(actions.updateTransactions, (state, { payload: { transactions, chainId } }) => {
      state.protocol[chainId].transactions = transactions;
    });
};
