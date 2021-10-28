import { JSBI } from '@manekiswap/sdk';
import { Button, Flex, Heading, IconButton, Spinner, Text } from '@theme-ui/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import SwapSVG from '../../../assets/images/icons/swap.svg';
import confirmPriceImpactWithoutFee from '../../../components/confirmPriceImpactWithoutFee';
import CurrencyAmountInput from '../../../components/forms/currency-amount.input';
import TokenPickerInput from '../../../components/forms/token-picker.input';
import SwapPriceInfo from '../../../components/infos/swap-price.info';
import ReviewSwapModal from '../../../components/modals/review-swap.modal';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import TransactionConfirmationModal from '../../../components/modals/transaction-confirmation.modal';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import { useAppContext } from '../../../context';
import { warningSeverity } from '../../../functions/prices';
import { computeFiatValuePriceImpact } from '../../../functions/trade';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { ApprovalState, useApproveCallbackFromTrade } from '../../../hooks/useApproveCallback';
import useIsArgentWallet from '../../../hooks/useIsArgentWallet';
import { useIsPairUnsupported } from '../../../hooks/useIsSwapUnsupported';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import useMultihop from '../../../hooks/useMultihop';
import useParsedQueryString from '../../../hooks/useParsedQueryString';
import { useSwapCallback } from '../../../hooks/useSwapCallback';
import useSwapPair from '../../../hooks/useSwapPair';
import useToggle from '../../../hooks/useToggle';
import { useUSDCValue } from '../../../hooks/useUSDCPrice';
import { WrapType } from '../../../hooks/useWrapCallback';
import routes, { buildRoute } from '../../../routes';
import getAddress from '../../../utils/getAddress';
import { FiInfo } from 'react-icons/fi';
import Tooltip from '../../../components/tooltips/tooltip';
import AdvancedSwapDetails from './advanced-swap-details';

const InfoIcon = () => <FiInfo sx={{ height: 13, width: 13, cursor: 'pointer', color: 'white.400' }} />;

export default function SwapPage() {
  const [activeTransactionSettings, toggleTransactionSettings] = useToggle(false);
  const [activeReviewSwap, toggleReviewSwap] = useToggle(false);
  const [activeTransactionConfirm, toggleTransactionConfirm] = useToggle(false);
  const { toggleConnectWallet } = useAppContext();
  const [txHash, setTxHash] = useState<string>('');
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // clicked confirm

  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
  const history = useHistory();
  const parsedQs = useParsedQueryString();

  const {
    disabledCurrency,
    isSelectingCurrency,
    toggleSelectCurrencyA,
    toggleSelectCurrencyB,
    onSelectCurrency,
    updateCurrencyAValue,
    updateCurrencyBValue,
    reset,
    formattedAmounts,
    parsedAmounts,
    trade,
    currencyBalances,
    currencies: { INPUT: currencyA, OUTPUT: currencyB },
    recipient,
    swapInputError,
    allowedSlippage,
    wrapType,
    execute: onWrap,
    wrapInputError,
  } = useSwapPair();

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;
  // const { address: recipientAddress } = useENSAddress(recipient);

  const { account } = useActiveWeb3React();

  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage);

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient);

  const singleHopOnly = !useMultihop();

  const fiatValueInput = useUSDCValue(parsedAmounts.INPUT);
  const fiatValueOutput = useUSDCValue(parsedAmounts.OUTPUT);
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput);

  // warnings on slippage
  // const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact;
    return warningSeverity(
      executionPriceImpact && priceImpact
        ? executionPriceImpact.greaterThan(priceImpact)
          ? executionPriceImpact
          : priceImpact
        : executionPriceImpact ?? priceImpact,
    );
  }, [priceImpact, trade]);

  const isArgentWallet = useIsArgentWallet();
  const swapIsUnsupported = useIsPairUnsupported(currencyA, currencyB);

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3);

  const routeNotFound = !trade?.route;

  const userHasSpecifiedInputOutput = Boolean(
    currencyA && currencyB && parsedAmounts.INPUT?.greaterThan(JSBI.BigInt(0)),
  );

  const isValid = !swapInputError;

  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approvalState]);

  const _onCloseTransactionSettingsModal = useCallback(() => {
    toggleTransactionSettings();
  }, [toggleTransactionSettings]);

  const _onReset = useCallback(() => {
    reset();
  }, [reset]);

  const _onCloseReviewSwapModal = useCallback(
    async (confirm: boolean) => {
      toggleReviewSwap();

      if (!confirm) return;

      if (!swapCallback) return;
      if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) return;

      toggleTransactionConfirm();
      setAttemptingTxn(true);

      try {
        const hash = await swapCallback();
        setTxHash(hash);
      } catch (error) {
        console.error(error);
      }

      setAttemptingTxn(false);
    },
    [toggleReviewSwap, swapCallback, priceImpact, toggleTransactionConfirm],
  );

  const _onCloseTransactionConfirmModal = useCallback(() => {
    toggleTransactionConfirm();
    if (txHash) {
      updateCurrencyAValue('');
      setTxHash('');
    }
  }, [toggleTransactionConfirm, txHash, updateCurrencyAValue]);

  const renderContent = useCallback(() => {
    return (
      <>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text sx={{ color: 'dark.100' }}>Select a pair</Text>
          <Flex>
            <Button variant="buttons.link" sx={{ marginRight: 16 }} onClick={_onReset}>
              Reset
            </Button>
            <Button
              variant="buttons.link"
              onClick={() => {
                toggleTransactionSettings();
              }}
            >
              <FiSettings sx={{ marginRight: '8px' }} />
              {!isUpToExtraSmall && 'Setting'}
            </Button>
          </Flex>
        </Flex>
        <Flex
          sx={{
            flexDirection: 'row',
            position: 'relative',
            marginBottom: trade?.executionPrice ? 64 : 24,
            ...mediaWidthTemplates.upToExtraSmall({ flexDirection: 'column' }),
          }}
        >
          <Flex
            sx={{
              marginRight: 16,
              flexDirection: 'column',
              position: 'relative',
              ...mediaWidthTemplates.upToExtraSmall({
                flex: 1,
                flexDirection: 'row',
                marginRight: 0,
                marginBottom: 12,
              }),
            }}
          >
            <TokenPickerInput
              sx={{
                width: 190,
                marginBottom: 16,
                ...mediaWidthTemplates.upToExtraSmall({ flex: 1, width: 'auto', marginBottom: 0, marginRight: 16 }),
              }}
              label="From"
              currency={currencyA}
              onClick={toggleSelectCurrencyA}
            />
            <TokenPickerInput
              sx={{ width: 190, ...mediaWidthTemplates.upToExtraSmall({ flex: 1, width: 'auto' }) }}
              label="To"
              currency={currencyB}
              onClick={toggleSelectCurrencyB}
            />
            <IconButton
              sx={{
                display: 'flex',
                height: 28,
                width: 28,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'dark.500',
                borderRadius: 'circle',
                position: 'absolute',
                top: `calc(50% - 14px)`,
                left: `calc(50% - 14px)`,
                '> svg': {
                  transform: 'rotate(90deg)',
                  height: 16,
                  width: 16,
                },
                ...mediaWidthTemplates.upToExtraSmall({
                  '> svg': {
                    transform: 'rotate(0deg)',
                  },
                }),
              }}
              onClick={() => {
                updateCurrencyAValue('');
                history.push(
                  buildRoute(
                    {
                      from: getAddress(currencyB),
                      to: getAddress(currencyA),
                      fromRoute: parsedQs.fromRoute as string,
                    },
                    { path: routes.swapNext },
                  ),
                );
              }}
            >
              <SwapSVG />
            </IconButton>
          </Flex>
          <Flex
            sx={{ flex: 1, flexDirection: 'column', ...mediaWidthTemplates.upToExtraSmall({ flexDirection: 'row' }) }}
          >
            <CurrencyAmountInput
              sx={{ marginBottom: 12, ...mediaWidthTemplates.upToExtraSmall({ marginBottom: 0, marginRight: 16 }) }}
              label="Amount"
              value={formattedAmounts.INPUT}
              fiatValue={fiatValueInput ?? undefined}
              onUserInput={updateCurrencyAValue}
            />
            <CurrencyAmountInput
              disabled={!!!currencyB}
              label="Amount"
              value={formattedAmounts.OUTPUT}
              fiatValue={fiatValueOutput ?? undefined}
              onUserInput={updateCurrencyBValue}
            />
          </Flex>
          {trade?.executionPrice && (
            <Flex sx={{ position: 'absolute', bottom: -40, right: 0, alignItems: 'center' }}>
              <SwapPriceInfo price={trade.executionPrice} />
              <Tooltip
                sx={{ marginLeft: 10 }}
                position="bottom"
                html={<AdvancedSwapDetails trade={trade} allowedSlippage={allowedSlippage} />}
              >
                <InfoIcon />
              </Tooltip>
            </Flex>
          )}
        </Flex>
        {swapIsUnsupported ? (
          <Button disabled>Unsupported Asset</Button>
        ) : !account ? (
          <Button
            onClick={() => {
              toggleConnectWallet();
            }}
          >
            Connect to wallet
          </Button>
        ) : showWrap ? (
          <Button disabled={!!wrapInputError} onClick={onWrap}>
            {wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null}
          </Button>
        ) : routeNotFound && userHasSpecifiedInputOutput ? (
          <Flex sx={{ flexDirection: 'column' }}>
            <Button disabled>Insufficient liquidity for this trade</Button>
            {singleHopOnly && (
              <Text sx={{ alignSelf: 'flex-end', fontSize: 0, marginTop: '8px', color: 'white.300' }}>
                Try enabling multi-hop trades
              </Text>
            )}
          </Flex>
        ) : showApproveFlow ? (
          approvalState !== ApprovalState.APPROVED ? (
            <Button
              variant="buttons.secondary"
              disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
              onClick={approveCallback}
            >
              {approvalState === ApprovalState.PENDING ? (
                <Spinner size={24} color={'white.400'} />
              ) : (
                `Approve ${currencyA?.symbol}`
              )}
            </Button>
          ) : (
            <Button
              disabled={!isValid || approvalState !== ApprovalState.APPROVED || !!swapCallbackError}
              onClick={() => {
                toggleReviewSwap();
              }}
            >
              Swap
            </Button>
          )
        ) : (
          <Button
            disabled={!isValid || !!swapCallbackError}
            onClick={() => {
              toggleReviewSwap();
            }}
          >
            Swap
          </Button>
        )}
      </>
    );
  }, [
    _onReset,
    isUpToExtraSmall,
    currencyA,
    toggleSelectCurrencyA,
    currencyB,
    toggleSelectCurrencyB,
    formattedAmounts.INPUT,
    formattedAmounts.OUTPUT,
    fiatValueInput,
    updateCurrencyAValue,
    fiatValueOutput,
    updateCurrencyBValue,
    swapIsUnsupported,
    account,
    showWrap,
    wrapInputError,
    onWrap,
    wrapType,
    routeNotFound,
    userHasSpecifiedInputOutput,
    singleHopOnly,
    showApproveFlow,
    approvalState,
    approvalSubmitted,
    approveCallback,
    isValid,
    swapCallbackError,
    trade,
    toggleTransactionSettings,
    history,
    toggleConnectWallet,
    toggleReviewSwap,
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
          position: 'relative',
        }}
      >
        {parsedQs.fromRoute && (
          <Button
            variant="buttons.link"
            sx={{
              position: 'absolute',
              top: 28,
              left: 28,
              ...mediaWidthTemplates.upToExtraSmall({ display: 'none' }),
            }}
            onClick={() => {
              if (parsedQs.fromRoute === routes.swap)
                history.push(
                  buildRoute(
                    {
                      from: getAddress(currencyA),
                      to: getAddress(currencyB),
                    },
                    { path: routes.swap },
                  ),
                );
            }}
          >
            <FiArrowLeft sx={{ marginRight: '8px' }} />
            Back
          </Button>
        )}
        <Flex sx={{ flexDirection: 'column', width: 600, maxWidth: '100vw' }}>
          <Heading
            variant="styles.h4"
            sx={{
              marginBottom: 16,
              marginX: 16,
              ...mediaWidthTemplates.upToExtraSmall({
                fontSize: 3,
              }),
            }}
          >
            Swap
          </Heading>
          <Flex
            sx={{
              marginX: 16,
              paddingX: 24,
              paddingTop: 24,
              paddingBottom: 32,
              flexDirection: 'column',
              backgroundColor: 'dark.500',
              borderRadius: 'lg',
              boxShadow: 'strong',
              ...mediaWidthTemplates.upToExtraSmall({
                paddingX: 16,
              }),
            }}
          >
            {renderContent()}
          </Flex>
        </Flex>
      </Flex>
      <SelectTokenModal
        active={isSelectingCurrency}
        title="Select token"
        disabledToken={disabledCurrency}
        onClose={onSelectCurrency}
      />
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} />
      <ReviewSwapModal
        active={activeReviewSwap}
        currencyA={currencyA && parsedAmounts?.INPUT}
        currencyB={currencyB && parsedAmounts?.OUTPUT}
        onClose={_onCloseReviewSwapModal}
      />
      <TransactionConfirmationModal
        active={activeTransactionConfirm}
        attemptingTxn={attemptingTxn}
        txHash={txHash}
        description={`Swapping ${parsedAmounts.INPUT?.toFixed(6)} ${
          currencyA?.symbol
        } for ${parsedAmounts.OUTPUT?.toFixed(6)} ${currencyB?.symbol}`}
        onClose={_onCloseTransactionConfirmModal}
      />
    </>
  );
}
