import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';

import { SupportedChainId } from '../../constants/chains';
import { PriceChartEntry, Transaction } from '../types';
import { GraphContext, TokenChartEntry, TokenData, TokensState } from './types';

export const initialState: TokensState = {
  byAddress: {
    [SupportedChainId.MAINNET]: {},
  },
};

export const actions = {
  updateTokenData: createAction<{ tokens: TokenData[]; chainId: number }>('tokens/updateTokenData'),
  addTokenKeys: createAction<{ tokenAddresses: string[]; chainId: number }>('tokens/addTokenKeys'),
  addPoolAddresses:
    createAction<{ tokenAddress: string; poolAddresses: string[]; chainId: number }>('tokens/addPoolAddresses'),
  updateChartData:
    createAction<{ tokenAddress: string; chartData: TokenChartEntry[]; chainId: number }>('tokens/updateChartData'),
  updateTransactions:
    createAction<{ tokenAddress: string; transactions: Transaction[]; chainId: number }>('tokens/updateTransactions'),
  updatePriceData: createAction<{
    tokenAddress: string;
    secondsInterval: number;
    priceData?: PriceChartEntry[];
    oldestFetchedTimestamp: number;
    chainId: number;
  }>('tokens/updatePriceData'),
};

export const addCases = (builder: ActionReducerMapBuilder<GraphContext>) => {
  builder
    .addCase(actions.updateTokenData, (state, { payload: { tokens, chainId } }) => {
      tokens.forEach((tokenData) => {
        state.token.byAddress[chainId][tokenData.address] = {
          ...state.token.byAddress[chainId][tokenData.address],
          data: tokenData,
          lastUpdated: Date.now().valueOf(),
        };
      });
    })
    .addCase(actions.addTokenKeys, (state, { payload: { tokenAddresses, chainId } }) => {
      tokenAddresses.forEach((address) => {
        if (!state.token.byAddress[chainId][address]) {
          state.token.byAddress[chainId][address] = {
            poolAddresses: undefined,
            data: undefined,
            chartData: undefined,
            priceData: {},
            transactions: undefined,
            lastUpdated: undefined,
          };
        }
      });
    })
    .addCase(actions.addPoolAddresses, (state, { payload: { tokenAddress, poolAddresses, chainId } }) => {
      state.token.byAddress[chainId][tokenAddress] = { ...state.token.byAddress[chainId][tokenAddress], poolAddresses };
    })
    .addCase(actions.updateChartData, (state, { payload: { tokenAddress, chartData, chainId } }) => {
      state.token.byAddress[chainId][tokenAddress] = { ...state.token.byAddress[chainId][tokenAddress], chartData };
    })
    .addCase(actions.updateTransactions, (state, { payload: { tokenAddress, transactions, chainId } }) => {
      state.token.byAddress[chainId][tokenAddress] = { ...state.token.byAddress[chainId][tokenAddress], transactions };
    })
    .addCase(
      actions.updatePriceData,
      (state, { payload: { tokenAddress, secondsInterval, priceData, oldestFetchedTimestamp, chainId } }) => {
        state.token.byAddress[chainId][tokenAddress] = {
          ...state.token.byAddress[chainId][tokenAddress],
          priceData: {
            ...state.token.byAddress[chainId][tokenAddress].priceData,
            [secondsInterval]: priceData,
            oldestFetchedTimestamp,
          },
        };
      },
    );
};
