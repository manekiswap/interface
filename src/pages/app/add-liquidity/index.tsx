import { BigNumber } from '@ethersproject/bignumber';
import { TransactionResponse } from '@ethersproject/providers';
import { useCallback, useContext, useState } from 'react';
import { FiCheck, FiChevronLeft, FiInfo, FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading, Text } from 'theme-ui';

import TokenAmountPickerInput from '../../../components/forms/token-amount-picker.input';
import ReviewLiquidityModal from '../../../components/modals/review-liquidity.modal';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import { DEFAULT_ADD_LIQUIDITY_SLIPPAGE_TOLERANCE, ONE_BIPS, ZERO_PERCENT } from '../../../constants';
import { mediaWidthTemplates } from '../../../constants/media';
import { AppCtx } from '../../../context';
import { calculateGasMargin, calculateSlippageAmount } from '../../../functions/trade';
import useAcknowledge from '../../../hooks/useAcknowledge';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { ApprovalState, useApproveCallback } from '../../../hooks/useApproveCallback';
import { useRouterContract } from '../../../hooks/useContract';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import useMintPair from '../../../hooks/useMintPair';
import useToggle from '../../../hooks/useToggle';
import useTransactionAdder from '../../../hooks/useTransactionAdder';
import useTransactionDeadline from '../../../hooks/useTransactionDeadline';
import { useUserSlippageToleranceWithDefault } from '../../../hooks/useUserSlippageToleranceWithDefault';
import { useAppDispatch } from '../../../reducers/hooks';
import { ShortToken } from '../../../reducers/swap/types';
import routes from '../../../routes';

type InputField = 'token0' | 'token1';

export default function AddLiquidityPage() {
  const [activeSelectToken, toggleSelectToken] = useToggle(false);
  const [activeTransactionSettings, toggleTransactionSettings] = useToggle(false);
  const [activeReviewLiquidity, toggleReviewLiquidity] = useToggle(false);
  const { toggleConnectWallet } = useContext(AppCtx);

  const [activeField, setActiveField] = useState<InputField | undefined>(undefined);

  const history = useHistory();
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
  const {
    updateToken0,
    updateToken1,
    updateToken0Value,
    updateToken1Value,
    reset,
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useMintPair();
  const [isFeeAcknowledged, feeAcknowledge] = useAcknowledge('POOL_FEE');

  const { account, chainId, library } = useActiveWeb3React();

  const routerContract = useRouterContract();
  const addTransaction = useTransactionAdder();
  const deadline = useTransactionDeadline();
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_ADD_LIQUIDITY_SLIPPAGE_TOLERANCE);

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts.CURRENCY_A, routerContract?.address);
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts.CURRENCY_B, routerContract?.address);

  const [txHash, setTxHash] = useState<string>('');

  const isValid = !error;

  const _onCloseSelectTokenModal = useCallback(
    (token: ShortToken | undefined) => {
      if (!!activeField && !!token) {
        if (activeField === 'token0') updateToken0(token);
        else if (activeField === 'token1') updateToken1(token);
      }
      toggleSelectToken();
    },
    [activeField, toggleSelectToken, updateToken0, updateToken1],
  );

  const _onCloseTransactionSettingsModal = useCallback(() => {
    toggleTransactionSettings();
  }, [toggleTransactionSettings]);

  const _onCloseReviewLiquidityModal = useCallback(
    async (confirm: boolean) => {
      toggleReviewLiquidity();

      if (!confirm) return;

      if (!chainId || !library || !account || !routerContract) return;

      const { CURRENCY_A: parsedAmountA, CURRENCY_B: parsedAmountB } = parsedAmounts;

      const currencyA = currencies.CURRENCY_A;
      const currencyB = currencies.CURRENCY_B;

      if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) return;

      const amountsMin = {
        CURRENCY_A: calculateSlippageAmount(parsedAmountA, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
        CURRENCY_B: calculateSlippageAmount(parsedAmountB, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
      };

      let estimate: (...args: any) => Promise<BigNumber>;
      let method: (...args: any) => Promise<TransactionResponse>;
      let args: Array<string | string[] | number>;
      let value: BigNumber | null;

      if (currencyA.isNative || currencyB.isNative) {
        const tokenBIsETH = currencyB.isNative;
        estimate = routerContract.estimateGas.addLiquidityETH;
        method = routerContract.addLiquidityETH;
        args = [
          (tokenBIsETH ? currencyA : currencyB)?.wrapped?.address ?? '', // token
          (tokenBIsETH ? parsedAmountA : parsedAmountB).quotient.toString(), // token desired
          amountsMin[tokenBIsETH ? 'CURRENCY_A' : 'CURRENCY_B'].toString(), // token min
          amountsMin[tokenBIsETH ? 'CURRENCY_B' : 'CURRENCY_A'].toString(), // eth min
          account,
          deadline.toHexString(),
        ];
        value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).quotient.toString());
      } else {
        estimate = routerContract.estimateGas.addLiquidity;
        method = routerContract.addLiquidity;
        args = [
          currencyA.wrapped?.address ?? '',
          currencyB.wrapped?.address ?? '',
          parsedAmountA.quotient.toString(),
          parsedAmountB.quotient.toString(),
          amountsMin.CURRENCY_A.toString(),
          amountsMin.CURRENCY_B.toString(),
          account,
          deadline.toHexString(),
        ];
        value = null;
      }

      try {
        const estimatedGasLimit = await estimate(...args, value ? { value } : {});
        const response = await method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        });

        addTransaction(response, { summary: '' });

        setTxHash(response.hash);
      } catch (error) {
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error);
        }
      }
    },
    [
      account,
      addTransaction,
      allowedSlippage,
      chainId,
      currencies.CURRENCY_A,
      currencies.CURRENCY_B,
      deadline,
      library,
      noLiquidity,
      parsedAmounts,
      routerContract,
      toggleReviewLiquidity,
    ],
  );

  const _onReset = useCallback(() => {
    reset();
  }, [reset]);

  const renderPrice = useCallback(() => {
    if (!currencies?.CURRENCY_A || !currencies?.CURRENCY_B) return null;
    return (
      <Flex sx={{ flexDirection: 'column' }}>
        <Text sx={{ fontWeight: 'bold' }}>Prices and pool share</Text>
        <Flex
          sx={{
            flexDirection: 'row',
            marginTop: '8px',
          }}
        >
          <Flex
            sx={{
              flex: 1,
              height: 64,
              flexDirection: 'column',
              borderRadius: 'base',
              border: '1px solid rgba(92, 92, 92, 0.3)',
              paddingTop: '8px',
              paddingBottom: 12,
              alignItems: 'center',
              marginRight: 12,
            }}
          >
            <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>
              {`${price?.invert()?.toSignificant(6) ?? '-'} ${currencies.CURRENCY_A?.symbol} per ${
                currencies.CURRENCY_B?.symbol
              }`}
            </Text>
            <Text
              sx={{ fontSize: 0, fontWeight: 'medium', color: 'white.200' }}
            >{`${currencies.CURRENCY_B.symbol} per ${currencies.CURRENCY_A.symbol}`}</Text>
          </Flex>
          <Flex
            sx={{
              flex: 1,
              height: 64,
              flexDirection: 'column',
              borderRadius: 'base',
              border: '1px solid rgba(92, 92, 92, 0.3)',
              paddingTop: '8px',
              paddingBottom: 12,
              alignItems: 'center',
              marginRight: '8px',
            }}
          >
            <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>
              {`${price?.toSignificant(6) ?? '-'} ${currencies.CURRENCY_B?.symbol} per ${
                currencies.CURRENCY_A?.symbol
              }`}
            </Text>
            <Text
              sx={{ fontSize: 0, fontWeight: 'medium', color: 'white.200' }}
            >{`${currencies.CURRENCY_A.symbol} per ${currencies.CURRENCY_B.symbol}`}</Text>
          </Flex>
        </Flex>
        <Flex
          sx={{
            flex: 1,
            height: 64,
            flexDirection: 'column',
            borderRadius: 'base',
            border: '1px solid rgba(92, 92, 92, 0.3)',
            paddingTop: '8px',
            paddingBottom: 12,
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>
            {`${
              noLiquidity && price
                ? '100'
                : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'
            }%`}
          </Text>
          <Text sx={{ fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>Share of Pool</Text>
        </Flex>
      </Flex>
    );
  }, [currencies.CURRENCY_A, currencies.CURRENCY_B, noLiquidity, poolTokenPercentage, price]);

  const renderContent = useCallback(() => {
    return (
      <>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Heading as="h5" variant="styles.h5" sx={{}}>
            Add liquidity
          </Heading>
          <Flex>
            <Button variant="buttons.small-link" sx={{ marginRight: 16 }} onClick={_onReset}>
              Reset
            </Button>
            <Button
              variant="buttons.small-link"
              onClick={() => {
                toggleTransactionSettings();
              }}
            >
              <FiSettings sx={{ marginRight: '8px' }} />
              {!isUpToExtraSmall && 'Setting'}
            </Button>
          </Flex>
        </Flex>
        <TokenAmountPickerInput
          sx={{ marginBottom: 12 }}
          token={currencies?.CURRENCY_A}
          balance={currencyBalances?.CURRENCY_A}
          onSelect={() => {
            setActiveField('token0');
            toggleSelectToken();
          }}
          onChangeText={(value: string) => {
            updateToken0Value(value);
          }}
        />
        <TokenAmountPickerInput
          sx={{ marginBottom: 24 }}
          token={currencies?.CURRENCY_B}
          balance={currencyBalances?.CURRENCY_B}
          onSelect={() => {
            setActiveField('token1');
            toggleSelectToken();
          }}
          onChangeText={(value: string) => {
            updateToken1Value(value);
          }}
        />
        {renderPrice()}
        {(approvalA === ApprovalState.NOT_APPROVED ||
          approvalA === ApprovalState.PENDING ||
          approvalB === ApprovalState.NOT_APPROVED ||
          approvalB === ApprovalState.PENDING ||
          isValid) && (
          <>
            <Flex
              sx={{ marginTop: approvalB !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED ? 12 : 0 }}
            >
              {approvalA !== ApprovalState.APPROVED && (
                <Button
                  variant="buttons.secondary"
                  disabled={approvalA === ApprovalState.PENDING}
                  sx={{ flex: 1, marginRight: approvalB !== ApprovalState.APPROVED ? 12 : 0 }}
                  onClick={approveACallback}
                >
                  {`Approve ${currencies.CURRENCY_A?.symbol}`}
                </Button>
              )}
              {approvalB !== ApprovalState.APPROVED && (
                <Button
                  variant="buttons.secondary"
                  disabled={approvalB === ApprovalState.PENDING}
                  sx={{ flex: 1 }}
                  onClick={approveBCallback}
                >
                  {`Approve ${currencies.CURRENCY_B?.symbol}`}
                </Button>
              )}
            </Flex>
          </>
        )}
        {!account ? (
          <Button
            sx={{ marginTop: 24 }}
            onClick={() => {
              toggleConnectWallet();
            }}
          >
            Connect to wallet
          </Button>
        ) : approvalA === ApprovalState.APPROVED && approvalB === ApprovalState.APPROVED ? (
          <Button
            disabled={approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
            sx={{ marginTop: 24 }}
            onClick={() => {
              toggleReviewLiquidity();
            }}
          >
            Add to pool
          </Button>
        ) : null}
      </>
    );
  }, [
    _onReset,
    account,
    approvalA,
    approvalB,
    currencies?.CURRENCY_A,
    currencies.CURRENCY_B,
    currencyBalances?.CURRENCY_A,
    currencyBalances?.CURRENCY_B,
    isUpToExtraSmall,
    isValid,
    renderPrice,
    toggleConnectWallet,
    toggleReviewLiquidity,
    toggleSelectToken,
    toggleTransactionSettings,
    updateToken0Value,
    updateToken1Value,
  ]);

  return (
    <>
      <Flex
        sx={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'dark.400',
          paddingY: 32,
        }}
      >
        <Flex sx={{ flexDirection: 'column', width: 512, maxWidth: '100vw' }}>
          <Button
            variant="buttons.link"
            sx={{ alignSelf: 'flex-start', marginX: 16, marginBottom: 16 }}
            onClick={() => {
              history.push(routes.pool);
            }}
          >
            <FiChevronLeft />
            Back to Pool Overview
          </Button>
          <Flex
            sx={{
              marginX: 16,
              paddingY: 24,
              marginBottom: 24,
              flexDirection: 'column',
              backgroundColor: 'background',
              boxShadow: 'card',
              borderRadius: 'lg',
              paddingX: 24,
              ...mediaWidthTemplates.upToExtraSmall({
                paddingX: 16,
              }),
            }}
          >
            {renderContent()}
          </Flex>
          {currencies?.CURRENCY_A && currencies?.CURRENCY_B && (
            <Flex
              sx={{
                padding: 12,
                marginX: 16,
                marginBottom: 16,
                borderRadius: 'base',
                borderColor: 'border',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Flex sx={{ alignItems: 'flex-start' }}>
                <Text sx={{ fontSize: 0, color: 'blue.100', marginLeft: 16 }}>
                  By adding liquidity you’ll earn <strong>0.3% of all trades</strong> on this pair proportional to share
                  of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your
                  liquidity.
                </Text>
              </Flex>
            </Flex>
          )}
          {!isFeeAcknowledged && (
            <Flex
              sx={{
                flexDirection: 'column',
                padding: 12,
                marginX: 16,
                borderRadius: 'base',
                borderColor: 'border',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Flex sx={{ alignItems: 'flex-start' }}>
                <FiInfo sx={{ color: 'white.400', marginTop: '-8px' }} size={32} />
                <Text sx={{ fontSize: 0, color: 'blue.100', marginLeft: 16 }}>
                  Tip: When you add liquidity you will receive pool tokens representing your position. These tokens
                  automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
                </Text>
              </Flex>
              <Button
                variant="buttons.small-link"
                sx={{ alignSelf: 'flex-end', marginTop: 12 }}
                onClick={feeAcknowledge}
              >
                Got it!
                <FiCheck size={16} sx={{ marginLeft: '8px' }} />
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
      <SelectTokenModal
        active={activeSelectToken}
        title="Select token"
        disabledToken={activeField === 'token0' ? currencies?.CURRENCY_A : currencies?.CURRENCY_B}
        onClose={_onCloseSelectTokenModal}
      />
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} />
      <ReviewLiquidityModal
        active={activeReviewLiquidity}
        token0={currencies?.CURRENCY_A && parsedAmounts?.CURRENCY_A}
        token1={currencies?.CURRENCY_B && parsedAmounts?.CURRENCY_B}
        onClose={_onCloseReviewLiquidityModal}
      />
    </>
  );
}
