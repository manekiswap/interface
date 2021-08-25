import { Percent } from '@uniswap/sdk-core';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import routes from '../routes';
import { Field, useDerivedBurnInfo } from './useDerivedBurnInfo';
import useParsedQueryString from './useParsedQueryString';
import { queryParametersToPoolState } from './usePoolPair';
import useTokenAddress from './useTokenAddress';

export default function useBurnPair(defaultValue: string) {
  const history = useHistory();
  const parsedQs = useParsedQueryString();
  const { address0, address1 } = queryParametersToPoolState(parsedQs);

  const token0 = useTokenAddress(address0);
  const token1 = useTokenAddress(address1);

  const [percent, setPercent] = useState(defaultValue);
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(
    { independentField: Field.LIQUIDITY_PERCENT, typedValue: percent },
    token0,
    token1,
  );

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]: parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
    [Field.CURRENCY_A]: parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    [Field.CURRENCY_B]: parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
  };

  const updateBurnPercent = useCallback((value: string) => {
    setPercent(value);
  }, []);

  useEffect(() => {
    if (!token0 || !token1) history.replace(routes.pool);
  }, [history, token0, token1]);

  return { token0, token1, updateBurnPercent, formattedAmounts, pair, parsedAmounts, error };
}
