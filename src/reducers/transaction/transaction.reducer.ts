import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SupportedChainId } from '../../constants/chains';
import { RootState } from '../types';
import { SerializableTransactionReceipt, TransactionState } from './types';

const initialState = (function () {
  return {} as TransactionState;
})();

const { actions, reducer } = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction(
      state,
      action: PayloadAction<{
        chainId: SupportedChainId;
        hash: string;
        from: string;
        approval?: { tokenAddress: string; spender: string };
        claim?: { recipient: string };
        summary?: string;
        archer?: {
          rawTransaction: string;
          deadline: number;
          nonce: number;
          ethTip: string;
        };
      }>,
    ) {
      const { chainId, from, hash, approval, summary, claim, archer } = action.payload;
      if (state[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.');
      }
      const txs = state[chainId] ?? {};
      txs[hash] = {
        hash,
        approval,
        summary,
        claim,
        from,
        addedTime: Date.now().valueOf(),
        archer,
      };
      state[chainId] = txs;
    },
    clearAllTransactions(state, action: PayloadAction<{ chainId: SupportedChainId }>) {
      const { chainId } = action.payload;
      if (!state[chainId]) return;
      state[chainId] = {};
    },
    checkedTransaction(state, action: PayloadAction<{ chainId: SupportedChainId; hash: string; blockNumber: number }>) {
      const { chainId, hash, blockNumber } = action.payload;
      const tx = state[chainId]?.[hash];
      if (!tx) return;

      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
      }
    },
    finalizeTransaction(
      state,
      action: PayloadAction<{ chainId: SupportedChainId; hash: string; receipt: SerializableTransactionReceipt }>,
    ) {
      const { chainId, hash, receipt } = action.payload;
      const tx = state[chainId]?.[hash];
      if (!tx) return;

      tx.receipt = receipt;
      tx.confirmedTime = Date.now().valueOf();
    },
  },
});

const selectors = (function () {
  const getState = (state: RootState) => state.transaction;

  return {
    selectTransactions: getState,
  };
})();

export default {
  actions,
  reducer,
  selectors,
};