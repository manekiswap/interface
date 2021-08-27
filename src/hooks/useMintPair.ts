import { Currency } from '@manekiswap/sdk';
import { ParsedQs } from 'qs';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import routes, { buildPoolRoute } from '../routes';
import getAddress from '../utils/getAddress';
import parseAddressFromURLParameter from '../utils/parseAddressFromURLParameter';
import useDerivedMintInfo, { Field } from './useDerivedMintInfo';
import useParsedQueryString from './useParsedQueryString';
import useCurrency from './useTokenAddress';

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

  const token0 = useCurrency(address0);
  const token1 = useCurrency(address1);

  const [independentField, setIndependentField] = useState(Field.CURRENCY_A);
  const [typedValue, setTypedValue] = useState('');
  const [otherTypedValue, setOtherTypedValue] = useState('');

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
      typedValue: typedValue,
      otherTypedValue: otherTypedValue,
    },
    token0,
    token1,
  );

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  };

  const updateToken0 = useCallback(
    (token: Currency) => {
      const route = buildPoolRoute({ address0: getAddress(token), address1: getAddress(token1) }, routes['pool-add']);
      history.push(route);
    },
    [history, token1],
  );

  const updateToken1 = useCallback(
    (token: Currency) => {
      const route = buildPoolRoute({ address0: getAddress(token0), address1: getAddress(token) }, routes['pool-add']);
      history.push(route);
    },
    [history, token0],
  );

  const updateToken0Value = useCallback(
    (value: string) => {
      if (noLiquidity) {
        if (independentField === Field.CURRENCY_A) {
          setTypedValue(value);
        } else {
          setTypedValue(value);
          setOtherTypedValue(typedValue);
        }
      } else {
        setTypedValue(value);
        setOtherTypedValue('');
      }
      setIndependentField(Field.CURRENCY_A);
    },
    [independentField, noLiquidity, typedValue],
  );

  const updateToken1Value = useCallback(
    (value: string) => {
      if (noLiquidity) {
        if (independentField === Field.CURRENCY_B) {
          setTypedValue(value);
        } else {
          setTypedValue(value);
          setOtherTypedValue(typedValue);
        }
      } else {
        setTypedValue(value);
        setOtherTypedValue('');
      }
      setIndependentField(Field.CURRENCY_B);
    },
    [independentField, noLiquidity, typedValue],
  );

  const reset = useCallback(() => {
    setTypedValue('');
    setOtherTypedValue('');
    setIndependentField(Field.CURRENCY_A);
    history.push(routes['pool-add']);
  }, [history]);

  return {
    updateToken0,
    updateToken1,
    updateToken0Value,
    updateToken1Value,
    reset,
    dependentField,
    formattedAmounts,
    parsedAmounts,
    currencies,
    pair,
    pairState,
    currencyBalances,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  };
}
