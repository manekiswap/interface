import { TransactionResponse } from '@ethersproject/providers';
import { Currency, CurrencyAmount, MaxUint256, Percent, Trade, TradeType } from '@manekiswap/sdk';
import { useCallback, useMemo } from 'react';

import { ROUTER_ADDRESS } from '../constants/addresses';
import { calculateGasMargin } from '../functions/trade';
import useActiveWeb3React from './useActiveWeb3React';
import { useTokenContract } from './useContract';
import { useHasPendingApproval } from './useHasPendingApproval';
import { useTokenAllowance } from './useTokenAllowance';
import useTransactionAdder from './useTransactionAdder';

export enum ApprovalState {
  UNKNOWN = 'UNKNOWN',
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount<Currency>,
  spender?: string,
): [ApprovalState, () => Promise<void>] {
  const { account } = useActiveWeb3React();
  const token = amountToApprove?.currency?.isToken ? amountToApprove.currency : undefined;
  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender);
  const pendingApproval = useHasPendingApproval(token?.address, spender);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED;
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, currentAllowance, pendingApproval, spender]);

  const tokenContract = useTokenContract(token?.address);
  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }
    if (!token) {
      console.error('no token');
      return;
    }

    if (!tokenContract) {
      console.error('tokenContract is null');
      return;
    }

    if (!amountToApprove) {
      console.error('missing amount to approve');
      return;
    }

    if (!spender) {
      console.error('no spender');
      return;
    }

    let useExact = false;
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true;
      return tokenContract.estimateGas.approve(spender, amountToApprove.quotient.toString());
    });

    try {
      const response: TransactionResponse = await tokenContract.approve(
        spender,
        useExact ? amountToApprove.quotient.toString() : MaxUint256,
        {
          gasLimit: calculateGasMargin(estimatedGas),
        },
      );

      addTransaction(response, {
        summary: 'Approve ' + amountToApprove.currency.symbol,
        approval: { tokenAddress: token.address, spender: spender },
      });
    } catch (error) {
      console.debug('Failed to approve token', error);
      throw error;
    }
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction]);

  return [approvalState, approve];
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(
  trade: Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent,
) {
  const { chainId } = useActiveWeb3React();
  const amountToApprove = useMemo(
    () => (trade && trade.inputAmount.currency.isToken ? trade.maximumAmountIn(allowedSlippage) : undefined),
    [trade, allowedSlippage],
  );
  return useApproveCallback(
    amountToApprove,
    chainId ? (trade instanceof Trade ? ROUTER_ADDRESS[chainId] : undefined) : undefined,
  );
}
