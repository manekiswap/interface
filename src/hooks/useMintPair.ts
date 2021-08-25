import { Token } from '@uniswap/sdk-core';
import { ParsedQs } from 'qs';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ShortToken } from '../reducers/swap/types';
import routes, { buildPoolRoute } from '../routes';
import parseAddressFromURLParameter from '../utils/parseAddressFromURLParameter';
import useDerivedMintInfo, { Field } from './useDerivedMintInfo';
import useParsedQueryString from './useParsedQueryString';
import useTokenAddress from './useTokenAddress';

export function queryParametersToPoolState(parsedQs: ParsedQs): { address0: string; address1: string } {
  let inputCurrency = parseAddressFromURLParameter(parsedQs.address0);
  let outputCurrency = parseAddressFromURLParameter(parsedQs.address1);
  if (inputCurrency === '' && outputCurrency === '') {
    // default to ETH input
    inputCurrency = 'ETH';
  } else if (inputCurrency === outputCurrency) {
    // clear output if identical
    outputCurrency = '';
  }

  return {
    address0: inputCurrency,
    address1: outputCurrency,
  };
}

export default function useMintPair() {
  const history = useHistory();
  const parsedQs = useParsedQueryString();
  const { address0, address1 } = queryParametersToPoolState(parsedQs);

  const token0 = useTokenAddress(address0);
  const token1 = useTokenAddress(address1);

  const [independentField, setIndependentField] = useState(Field.CURRENCY_A);
  const [token0TypedValue, setToken0TypedValue] = useState('0');
  const [token1TypedValue, setToken1TypedValue] = useState('0');

  const {
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
  } = useDerivedMintInfo(
    {
      independentField,
      typedValue: independentField === Field.CURRENCY_A ? token0TypedValue : token1TypedValue,
      otherTypedValue: independentField === Field.CURRENCY_A ? token1TypedValue : token0TypedValue,
    },
    token0,
    token1,
  );

  const getAddress = (token?: { address?: string; symbol?: string }) => {
    if (!token) return undefined;
    if (token.symbol?.toUpperCase() === 'ETH') return 'ETH';
    return (token as Token).address;
  };

  const updateToken0 = useCallback(
    (token: Pick<ShortToken, 'address' | 'symbol'>) => {
      let route = '';

      route = buildPoolRoute({ address0: getAddress(token), address1: getAddress(token1) }, routes['pool-add']);
      history.push(route);
    },
    [history, token1],
  );

  const updateToken1 = useCallback(
    (token: Pick<ShortToken, 'address' | 'symbol'>) => {
      let route = '';

      route = buildPoolRoute({ address0: getAddress(token0), address1: getAddress(token) }, routes['pool-add']);
      history.push(route);
    },
    [history, token0],
  );

  const updateToken0Value = useCallback((value: string) => {
    setToken0TypedValue(value);
    setIndependentField(Field.CURRENCY_A);
  }, []);

  const updateToken1Value = useCallback((value: string) => {
    setToken1TypedValue(value);
    setIndependentField(Field.CURRENCY_B);
  }, []);

  const reset = useCallback(() => {
    setToken0TypedValue('0');
    setToken1TypedValue('0');
    history.push(routes['pool-add']);
  }, [history]);

  return {
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
  };
}
