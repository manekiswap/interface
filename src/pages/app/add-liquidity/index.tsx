import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { useCallback, useContext, useState } from 'react';
import { FiCheck, FiChevronLeft, FiInfo, FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading, Text } from 'theme-ui';

import TokenAmountPickerInput from '../../../components/forms/token-amount-picker.input';
import ReviewLiquidityModal from '../../../components/modals/review-liquidity.modal';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import { ExtendedEther } from '../../../constants/extended-ether';
import { mediaWidthTemplates } from '../../../constants/media';
import { AppCtx } from '../../../context';
import useAcknowledge from '../../../hooks/useAcknowledge';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import usePoolPair from '../../../hooks/usePoolPair';
import useToggle from '../../../hooks/useToggle';
import { useTokenBalances } from '../../../hooks/useTokenBalances';
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
  const { token0, token1, updateToken0, updateToken1, reset } = usePoolPair();
  const [isFeeAcknowledged, feeAcknowledge] = useAcknowledge('POOL_FEE');

  const { account } = useActiveWeb3React();

  const pairs: Token[] = [token0, token1]
    .filter((token) => !!token)
    .map((token) => (token instanceof ExtendedEther ? token.wrapped : (token as Token)));
  const pairBalances = useTokenBalances(pairs, account ?? undefined);

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
    (confirm: boolean) => {
      toggleReviewLiquidity();
    },
    [toggleReviewLiquidity],
  );

  const _onReset = useCallback(() => {
    reset();
  }, [reset]);

  const renderPrice = useCallback(() => {
    if (!token0 || !token1) return null;
    return (
      <Flex sx={{ flexDirection: 'column', marginBottom: 24 }}>
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
              marginRight: '8px',
            }}
          >
            <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`0.2031203`}</Text>
            <Text
              sx={{ fontSize: 0, fontWeight: 'medium', color: 'white.200' }}
            >{`${token0.symbol} per ${token1.symbol}`}</Text>
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
            }}
          >
            <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`0.2031203`}</Text>
            <Text
              sx={{ fontSize: 0, fontWeight: 'medium', color: 'white.200' }}
            >{`${token1.symbol} per ${token0.symbol}`}</Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }, [token0, token1]);

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
          token={token0}
          balance={
            token0 instanceof ExtendedEther
              ? pairBalances[token0.wrapped.address]
              : pairBalances[(token0 as Token)?.address]
          }
          onSelect={() => {
            setActiveField('token0');
            toggleSelectToken();
          }}
        />
        <TokenAmountPickerInput
          sx={{ marginBottom: 24 }}
          token={token1}
          balance={
            token1 instanceof ExtendedEther
              ? pairBalances[token1.wrapped.address]
              : pairBalances[(token1 as Token)?.address]
          }
          onSelect={() => {
            setActiveField('token1');
            toggleSelectToken();
          }}
        />
        {renderPrice()}
        <Button
          disabled={!token0 || !token1}
          onClick={() => {
            if (!account) toggleConnectWallet();
            else toggleReviewLiquidity();
          }}
        >
          {!!account ? 'Add to pool' : 'Connect to wallet'}
        </Button>
      </>
    );
  }, [
    _onReset,
    account,
    isUpToExtraSmall,
    pairBalances,
    renderPrice,
    toggleConnectWallet,
    toggleReviewLiquidity,
    toggleSelectToken,
    toggleTransactionSettings,
    token0,
    token1,
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
          {token0 && token1 && (
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
        disabledToken={activeField === 'token0' ? token1 : token0}
        onClose={_onCloseSelectTokenModal}
      />
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} />
      <ReviewLiquidityModal
        active={activeReviewLiquidity}
        token0={token0 && CurrencyAmount.fromRawAmount(token0, '123123')}
        token1={token1 && CurrencyAmount.fromRawAmount(token1, '123123')}
        onClose={_onCloseReviewLiquidityModal}
      />
    </>
  );
}
