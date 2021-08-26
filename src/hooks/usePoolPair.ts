import { Currency } from '@uniswap/sdk-core';
import { ParsedQs } from 'qs';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import routes, { buildPoolRoute } from '../routes';
import getAddress from '../utils/getAddress';
import parseAddressFromURLParameter from '../utils/parseAddressFromURLParameter';
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

export default function usePoolPair(basePath = routes.pool) {
  const history = useHistory();
  const parsedQs = useParsedQueryString();
  const { address0, address1 } = queryParametersToPoolState(parsedQs);

  const token0 = useCurrency(address0);
  const token1 = useCurrency(address1);

  const updateToken0 = useCallback(
    (token: Currency) => {
      const route = buildPoolRoute({ address0: getAddress(token), address1: getAddress(token1) }, basePath);
      history.push(route);
    },
    [basePath, history, token1],
  );

  const updateToken1 = useCallback(
    (token: Currency) => {
      const route = buildPoolRoute({ address0: getAddress(token0), address1: getAddress(token) }, basePath);
      history.push(route);
    },
    [basePath, history, token0],
  );

  return {
    updateToken0,
    updateToken1,
    currencies: {
      CURRENCY_A: token0,
      CURRENCY_B: token1,
    },
  };
}
