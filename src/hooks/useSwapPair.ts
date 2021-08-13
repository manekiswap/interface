import { ParsedQs } from 'qs';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Token } from '../constants/token';
import { actions } from '../reducers';
import { useAppDispatch } from '../reducers/hooks';
import { ShortToken } from '../reducers/swap/types';
import routes, { buildSwapRoute } from '../routes';
import parseAddressFromURLParameter from '../utils/parseAddressFromURLParameter';
import useActiveChainId from './useActiveChainId';
import useParsedQueryString from './useParsedQueryString';
import useTokenAddress from './useTokenAddress';

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

export default function useSwapPair(): {
  token0: Token;
  token1?: Token;
  updateToken0: (token: Pick<ShortToken, 'address' | 'symbol'>) => void;
  updateToken1: (token: Pick<ShortToken, 'address' | 'symbol'>) => void;
  reset: () => void;
} {
  const chainId = useActiveChainId();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const parsedQs = useParsedQueryString();
  const { from, to } = queryParametersToSwapState(parsedQs);

  const token0 = useTokenAddress(from);
  const token1 = useTokenAddress(to);

  useEffect(() => {
    if (!chainId) return;

    token0 && dispatch(actions.swap.update({ field: 'token0', token: token0.toShortToken() }));
    token1 && dispatch(actions.swap.update({ field: 'token1', token: token1.toShortToken() }));
  }, [dispatch, chainId, token0, token1]);

  const updateToken0 = (token: Pick<ShortToken, 'address' | 'symbol'>) => {
    let route = '';

    if (token.symbol?.toUpperCase() === 'ETH') {
      route = buildSwapRoute({ from: 'ETH', to: token1?.address });
    } else {
      route = buildSwapRoute({ from: token.address, to: token1?.address });
    }

    history.push(route);
  };

  const updateToken1 = (token: Pick<ShortToken, 'address' | 'symbol'>) => {
    let route = '';

    if (token0!.symbol?.toUpperCase() === 'ETH') {
      route = buildSwapRoute({ from: 'ETH', to: token.address });
    } else {
      route = buildSwapRoute({ from: token0!.address, to: token.address });
    }

    history.push(route);
  };

  const reset = useCallback(() => {
    history.push(routes.swap);
    dispatch(actions.swap.reset());
  }, [dispatch, history]);

  return { token0: token0!, token1, updateToken0, updateToken1, reset };
}
