import { Currency } from '@manekiswap/sdk';
import { ParsedQs } from 'qs';
import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import routes, { buildSwapRoute } from '../routes';
import getAddress from '../utils/getAddress';
import parseAddressFromURLParameter from '../utils/parseAddressFromURLParameter';
import useActiveWeb3React from './useActiveWeb3React';
import { Field, useDerivedSwapInfo } from './useDerivedSwapInfo';
import useParsedQueryString from './useParsedQueryString';
import useCurrency from './useTokenAddress';
import useWrapCallback, { WrapType } from './useWrapCallback';

export function queryParametersToSwapState(parsedQs: ParsedQs): { from: string; to: string } {
  let inputCurrency = parseAddressFromURLParameter(parsedQs.from);
  let outputCurrency = parseAddressFromURLParameter(parsedQs.to);
  if (inputCurrency === '' && outputCurrency === '') {
    // default to ETH input
    inputCurrency = 'ETH';
  } else if (inputCurrency === outputCurrency) {
    // clear output if identical
    outputCurrency = '';
  }

  return {
    from: inputCurrency,
    to: outputCurrency,
  };
}

export default function useSwapPair() {
  const history = useHistory();
  const parsedQs = useParsedQueryString();
  const { from, to } = queryParametersToSwapState(parsedQs);

  const token0 = useCurrency(from);
  const token1 = useCurrency(to);

  const [independentField, setIndependentField] = useState(Field.INPUT);
  const [typedValue, setTypedValue] = useState('');
  const { account } = useActiveWeb3React();
  const [recipient, setRecipient] = useState(account ?? '');

  const {
    trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
    allowedSlippage,
  } = useDerivedSwapInfo({
    independentField,
    typedValue,
    [Field.INPUT]: {
      address: getAddress(token0),
    },
    [Field.OUTPUT]: {
      address: getAddress(token1),
    },
    recipient,
  });

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies.INPUT, currencies.OUTPUT, typedValue);
  const showWrap = wrapType !== WrapType.NOT_APPLICABLE;

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            INPUT: parsedAmount,
            OUTPUT: parsedAmount,
          }
        : {
            INPUT: independentField === 'INPUT' ? parsedAmount : trade?.inputAmount,
            OUTPUT: independentField === 'OUTPUT' ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade?.inputAmount, trade?.outputAmount],
  );

  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  };

  const updateToken0 = useCallback(
    (token: Currency) => {
      const route = buildSwapRoute({ from: getAddress(token), to: getAddress(token1) });
      history.push(route);
    },
    [history, token1],
  );

  const updateToken1 = useCallback(
    (token: Currency) => {
      const route = buildSwapRoute({ from: getAddress(token0), to: getAddress(token) });
      history.push(route);
    },
    [history, token0],
  );

  const updateToken0Value = useCallback((value: string) => {
    setTypedValue(value);
    setIndependentField(Field.INPUT);
  }, []);

  const updateToken1Value = useCallback((value: string) => {
    setTypedValue(value);
    setIndependentField(Field.OUTPUT);
  }, []);

  const reset = useCallback(() => {
    setTypedValue('');
    setIndependentField(Field.INPUT);
    history.push(routes.swap);
  }, [history]);

  return {
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
    currencies,
    recipient,
    swapInputError,
    allowedSlippage,
    wrapType,
    execute: onWrap,
    wrapInputError,
  };
}
