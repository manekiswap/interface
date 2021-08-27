import { Currency } from '@manekiswap/sdk';
import { useCallback, useMemo, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Button, Flex, Heading, Spinner, Text } from 'theme-ui';

import confirmPriceImpactWithoutFee from '../../../components/confirmPriceImpactWithoutFee';
import NumericInput from '../../../components/forms/numeric.input';
import TokenPickerInput from '../../../components/forms/token-picker.input';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import { useAppContext } from '../../../context';
import { warningSeverity } from '../../../functions/prices';
import { computeFiatValuePriceImpact } from '../../../functions/trade';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { ApprovalState, useApproveCallbackFromTrade } from '../../../hooks/useApproveCallback';
import useIsArgentWallet from '../../../hooks/useIsArgentWallet';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import { useSwapCallback } from '../../../hooks/useSwapCallback';
import useSwapPair from '../../../hooks/useSwapPair';
import useToggle from '../../../hooks/useToggle';
import { useUSDCValue } from '../../../hooks/useUSDCPrice';
import { WrapType } from '../../../hooks/useWrapCallback';
import { selectors } from '../../../reducers';

type InputField = 'token0' | 'token1';

export default function SwapPage() {
  const [activeSelectToken, toggleSelectToken] = useToggle(false);
  const [activeTransactionSettings, toggleTransactionSettings] = useToggle(false);
  const { toggleConnectWallet } = useAppContext();

  const [activeField, setActiveField] = useState<InputField | undefined>(undefined);
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');

  const {
    updateToken0,
    updateToken1,
    updateToken0Value,
    updateToken1Value,
    reset,
    independentField,
    dependentField,
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

  const { account, chainId, library } = useActiveWeb3React();

  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage);

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient);

  const singleHopOnly = !useSelector(selectors.user.selectMultihop);

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

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.PENDING) &&
    !(priceImpactSeverity > 3);

  const _onCloseSelectTokenModal = useCallback(
    (token: Currency | undefined) => {
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

  const _onReset = useCallback(() => {
    reset();
  }, [reset]);

  const _onSwap = useCallback(async () => {
    if (!swapCallback) return;
    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) return;

    try {
      const hash = await swapCallback();
    } catch (error) {
      console.error(error);
    }
  }, [swapCallback, priceImpact]);

  const renderContent = useCallback(() => {
    return (
      <>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text sx={{ color: 'title' }}>Select a pair</Text>
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
        <Flex
          sx={{
            flexDirection: 'row',
            marginBottom: 24,
            ...mediaWidthTemplates.upToExtraSmall({ flexDirection: 'column' }),
          }}
        >
          <Flex
            sx={{
              marginRight: 16,
              flexDirection: 'column',
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
                width: 172,
                marginBottom: 12,
                ...mediaWidthTemplates.upToExtraSmall({ flex: 1, width: 'auto', marginBottom: 0, marginRight: 16 }),
              }}
              label="From"
              token={currencyA}
              onClick={() => {
                setActiveField('token0');
                toggleSelectToken();
              }}
            />
            <TokenPickerInput
              sx={{ width: 172, ...mediaWidthTemplates.upToExtraSmall({ flex: 1, width: 'auto' }) }}
              label="To"
              token={currencyB}
              onClick={() => {
                setActiveField('token1');
                toggleSelectToken();
              }}
            />
          </Flex>
          <Flex
            sx={{ flex: 1, flexDirection: 'column', ...mediaWidthTemplates.upToExtraSmall({ flexDirection: 'row' }) }}
          >
            <NumericInput
              sx={{ marginBottom: 12, ...mediaWidthTemplates.upToExtraSmall({ marginBottom: 0, marginRight: 16 }) }}
              label="Amount"
              value={formattedAmounts.INPUT}
              onUserInput={(value) => {
                updateToken0Value(value);
              }}
            />
            <NumericInput
              disabled={!!!currencyB}
              label="Amount"
              value={formattedAmounts.OUTPUT}
              onUserInput={(value) => {
                updateToken1Value(value);
              }}
            />
          </Flex>
        </Flex>
        {!account ? (
          <Button
            onClick={() => {
              toggleConnectWallet();
            }}
          >
            Connect to wallet
          </Button>
        ) : showApproveFlow ? (
          <>
            {approvalState !== ApprovalState.APPROVED ? (
              <Button
                variant="buttons.secondary"
                disabled={approvalState !== ApprovalState.NOT_APPROVED}
                onClick={approveCallback}
              >
                {approvalState === ApprovalState.PENDING ? (
                  <Spinner size={24} color={'white.400'} />
                ) : (
                  `Approve ${currencyA?.symbol}`
                )}
              </Button>
            ) : (
              <Button onClick={_onSwap}>Swap</Button>
            )}
          </>
        ) : (
          <Button onClick={_onSwap}>Swap</Button>
        )}
      </>
    );
  }, [
    _onReset,
    isUpToExtraSmall,
    currencyA,
    currencyB,
    formattedAmounts.INPUT,
    formattedAmounts.OUTPUT,
    account,
    showApproveFlow,
    approvalState,
    approveCallback,
    _onSwap,
    toggleTransactionSettings,
    toggleSelectToken,
    updateToken0Value,
    updateToken1Value,
    toggleConnectWallet,
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
          <Heading
            as="h3"
            variant="styles.h3"
            sx={{
              marginBottom: 12,
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
              paddingY: 24,
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
        </Flex>
      </Flex>
      <SelectTokenModal
        active={activeSelectToken}
        title="Select token"
        disabledToken={activeField === 'token0' ? currencyB : currencyA}
        onClose={_onCloseSelectTokenModal}
      />
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} />
    </>
  );
}
