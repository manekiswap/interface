import { BigNumber } from '@ethersproject/bignumber';
import { TransactionResponse } from '@ethersproject/providers';
import { useCallback, useState } from 'react';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Flex, Heading, Text } from 'theme-ui';

import TokenLogo from '../../../components/logos/token.logo';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import AmountSlider from '../../../components/sliders/amount.slider';
import { DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE } from '../../../constants';
import { mediaWidthTemplates } from '../../../constants/media';
import { calculateGasMargin, calculateSlippageAmount } from '../../../functions/trade';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { ApprovalState, useApproveCallback } from '../../../hooks/useApproveCallback';
import useBurnPair from '../../../hooks/useBurnPair';
import { usePairContract, useRouterContract } from '../../../hooks/useContract';
import { useLiquidityTokenPermit } from '../../../hooks/useERC20Permit';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import useToggle from '../../../hooks/useToggle';
import useTransactionAdder from '../../../hooks/useTransactionAdder';
import useTransactionDeadline from '../../../hooks/useTransactionDeadline';
import { useUserSlippageToleranceWithDefault } from '../../../hooks/useUserSlippageToleranceWithDefault';
import routes from '../../../routes';

export default function RemoveLiquidityPage() {
  const history = useHistory();
  const [activeTransactionSettings, toggleTransactionSettings] = useToggle(false);
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
  const {
    token0: currencyA,
    token1: currencyB,
    updateBurnPercent,
    formattedAmounts,
    pair,
    parsedAmounts,
    error,
  } = useBurnPair('0');

  const { account, chainId, library } = useActiveWeb3React();

  const pairContract = usePairContract(pair?.liquidityToken?.address);
  const routerContract = useRouterContract();
  const addTransaction = useTransactionAdder();
  const { gatherPermitSignature, signatureData } = useLiquidityTokenPermit(
    parsedAmounts.LIQUIDITY,
    routerContract?.address,
  );
  const [approval, approveCallback] = useApproveCallback(parsedAmounts.LIQUIDITY, routerContract?.address);

  const deadline = useTransactionDeadline();
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE);

  const [txHash, setTxHash] = useState<string>('');

  const onAttemptToApprove = useCallback(async () => {
    if (!pairContract || !pair || !library || !deadline) throw new Error('missing dependencies');
    const liquidityAmount = parsedAmounts.LIQUIDITY;
    if (!liquidityAmount) throw new Error('missing liquidity amount');

    await approveCallback();
  }, [approveCallback, deadline, library, pair, pairContract, parsedAmounts.LIQUIDITY]);

  const _onCloseTransactionSettingsModal = useCallback(() => {
    toggleTransactionSettings();
  }, [toggleTransactionSettings]);

  const _onCloseReviewLiquidityModal = useCallback(
    async (confirm: boolean) => {
      if (!confirm) return;

      if (!chainId || !library || !account || !routerContract) throw new Error('missing dependencies');

      const { CURRENCY_A: currencyAmountA, CURRENCY_B: currencyAmountB } = parsedAmounts;

      if (!currencyAmountA || !currencyAmountB) {
        throw new Error('missing currency amounts');
      }

      const tokenA = pair?.token0;
      const tokenB = pair?.token1;

      if (!deadline) return;

      const amountsMin = {
        CURRENCY_A: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
        CURRENCY_B: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
      };

      if (!currencyA || !currencyB) throw new Error('missing tokens');
      const liquidityAmount = parsedAmounts.LIQUIDITY;
      if (!liquidityAmount) throw new Error('missing liquidity amount');

      const currencyBIsETH = currencyB.isNative;
      const oneCurrencyIsETH = currencyA.isNative || currencyBIsETH;

      if (!tokenA || !tokenB) throw new Error('could not wrap');

      let methodNames: string[], args: Array<string | string[] | number | boolean>;
      // we have approval, use normal remove liquidity
      if (approval === ApprovalState.APPROVED) {
        // removeLiquidityETH
        if (oneCurrencyIsETH) {
          methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens'];
          args = [
            currencyBIsETH ? tokenA.address : tokenB.address,
            liquidityAmount.quotient.toString(),
            amountsMin[currencyBIsETH ? 'CURRENCY_A' : 'CURRENCY_B'].toString(),
            amountsMin[currencyBIsETH ? 'CURRENCY_B' : 'CURRENCY_A'].toString(),
            account,
            deadline.toHexString(),
          ];
        }
        // removeLiquidity
        else {
          methodNames = ['removeLiquidity'];
          args = [
            tokenA.address,
            tokenB.address,
            liquidityAmount.quotient.toString(),
            amountsMin.CURRENCY_A.toString(),
            amountsMin.CURRENCY_B.toString(),
            account,
            deadline.toHexString(),
          ];
        }
      }
      // we have a signature, use permit versions of remove liquidity
      else if (signatureData !== null) {
        // removeLiquidityETHWithPermit
        if (oneCurrencyIsETH) {
          methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens'];
          args = [
            currencyBIsETH ? tokenA.address : tokenB.address,
            liquidityAmount.quotient.toString(),
            amountsMin[currencyBIsETH ? 'CURRENCY_A' : 'CURRENCY_B'].toString(),
            amountsMin[currencyBIsETH ? 'CURRENCY_B' : 'CURRENCY_A'].toString(),
            account,
            signatureData.deadline,
            false,
            signatureData.v,
            signatureData.r,
            signatureData.s,
          ];
        }
        // removeLiquidityETHWithPermit
        else {
          methodNames = ['removeLiquidityWithPermit'];
          args = [
            tokenA.address,
            tokenB.address,
            liquidityAmount.quotient.toString(),
            amountsMin.CURRENCY_A.toString(),
            amountsMin.CURRENCY_B.toString(),
            account,
            signatureData.deadline,
            false,
            signatureData.v,
            signatureData.r,
            signatureData.s,
          ];
        }
      } else {
        throw new Error('Attempting to confirm without approval or a signature. Please contact support.');
      }

      const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
        methodNames.map((methodName) =>
          routerContract.estimateGas[methodName](...args)
            .then(calculateGasMargin)
            .catch((error) => {
              console.error(`estimateGas failed`, methodName, args, error);
              return undefined;
            }),
        ),
      );

      const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
        BigNumber.isBigNumber(safeGasEstimate),
      );

      // all estimations failed...
      if (indexOfSuccessfulEstimation === -1) {
        console.error('This transaction would fail. Please contact support.');
      } else {
        const methodName = methodNames[indexOfSuccessfulEstimation];
        const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation];

        await routerContract[methodName](...args, {
          gasLimit: safeGasEstimate,
        })
          .then((response: TransactionResponse) => {
            addTransaction(response, { summary: '' });

            setTxHash(response.hash);
          })
          .catch((error: Error) => {
            // we only care if the error is something _other_ than the user rejected the tx
            console.error(error);
          });
      }
    },
    [
      account,
      addTransaction,
      allowedSlippage,
      approval,
      chainId,
      currencyA,
      currencyB,
      deadline,
      library,
      pair?.token0,
      pair?.token1,
      parsedAmounts,
      routerContract,
      signatureData,
    ],
  );

  const renderContent = useCallback(() => {
    if (!pair) return null;
    return (
      <>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Heading as="h5" variant="styles.h5" sx={{}}>
            Remove liquidity
          </Heading>
          <Flex>
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

        <Flex sx={{ marginBottom: 24 }}>
          <TokenLogo token={pair.token0} />
          <TokenLogo token={pair.token1} sx={{ marginLeft: '4px' }} />
          <Text sx={{ marginLeft: 12, fontWeight: 'bold' }}>{`${pair.token0.symbol}/${pair.token1.symbol}`}</Text>
        </Flex>
        <AmountSlider sx={{ marginBottom: 24 }} onSlide={(value) => updateBurnPercent(`${value}`)} />
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Pooled ${pair.token0.symbol}:`}</Text>
          <Flex>
            <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>
              {formattedAmounts.CURRENCY_A}
            </Text>
            <TokenLogo token={pair.token0} />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Pooled ${pair.token1.symbol}:`}</Text>
          <Flex>
            <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>
              {formattedAmounts.CURRENCY_B}
            </Text>
            <TokenLogo token={pair.token1} />
          </Flex>
        </Flex>
        <Divider sx={{ marginBottom: 12 }} />
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Your pool tokens:`}</Text>
          <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>{formattedAmounts.LIQUIDITY}</Text>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 24 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Your pool share:`}</Text>
          <Text
            sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}
          >{`${formattedAmounts.LIQUIDITY_PERCENT}%`}</Text>
        </Flex>

        <Button>Remove liquidity</Button>
      </>
    );
  }, [
    formattedAmounts.CURRENCY_A,
    formattedAmounts.CURRENCY_B,
    formattedAmounts.LIQUIDITY,
    formattedAmounts.LIQUIDITY_PERCENT,
    isUpToExtraSmall,
    pair,
    toggleTransactionSettings,
    updateBurnPercent,
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
            Back
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
        </Flex>
      </Flex>
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} />
    </>
  );
}
