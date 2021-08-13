import { ParsedQs } from 'qs';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Token } from '../constants/token';
import { ShortToken } from '../reducers/swap/types';
import routes, { buildPoolRoute } from '../routes';
import parseAddressFromURLParameter from '../utils/parseAddressFromURLParameter';
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

export default function usePoolPair(): {
  token0: Token;
  token1?: Token;
  updateToken0: (token: Pick<ShortToken, 'address' | 'symbol'>) => void;
  updateToken1: (token: Pick<ShortToken, 'address' | 'symbol'>) => void;
  reset: () => void;
} {
  const history = useHistory();
  const parsedQs = useParsedQueryString();
  const { address0, address1 } = queryParametersToPoolState(parsedQs);

  const token0 = useTokenAddress(address0);
  const token1 = useTokenAddress(address1);

  const updateToken0 = (token: Pick<ShortToken, 'address' | 'symbol'>) => {
    let route = '';

    if (token.symbol?.toUpperCase() === 'ETH') {
      route = buildPoolRoute({ address0: 'ETH', address1: token1?.address });
    } else {
      route = buildPoolRoute({ address0: token.address, address1: token1?.address });
    }

    history.push(route);
  };

  const updateToken1 = (token: Pick<ShortToken, 'address' | 'symbol'>) => {
    let route = '';

    if (token0!.symbol?.toUpperCase() === 'ETH') {
      route = buildPoolRoute({ address0: 'ETH', address1: token.address });
    } else {
      route = buildPoolRoute({ address0: token0!.address, address1: token.address });
    }

    history.push(route);
  };

  const reset = useCallback(() => {
    history.push(routes.pool);
  }, [history]);

  return { token0: token0!, token1, updateToken0, updateToken1, reset };
}
