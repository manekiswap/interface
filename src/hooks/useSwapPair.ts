import { Currency, Token } from '@uniswap/sdk-core';
import { get } from 'lodash';
import { ParsedQs } from 'qs';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
  token0?: Currency;
  token1?: Currency;
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

    token0 &&
      dispatch(
        actions.swap.update({
          field: 'token0',
          token: {
            chainId: token0.chainId,
            address: get(token0, 'address', ''),
            decimals: token0.decimals,
            symbol: token0.symbol,
            name: token0.symbol,
          },
        }),
      );
    token1 &&
      dispatch(
        actions.swap.update({
          field: 'token1',
          token: {
            chainId: token1.chainId,
            address: get(token1, 'address', ''),
            decimals: token1.decimals,
            symbol: token1.symbol,
            name: token1.symbol,
          },
        }),
      );
  }, [dispatch, chainId, token0, token1]);

  const getAddress = (token?: { address?: string; symbol?: string }) => {
    if (!token) return undefined;
    if (token.symbol?.toUpperCase() === 'ETH') return 'ETH';
    return (token as Token).address;
  };

  const updateToken0 = (token: Pick<ShortToken, 'address' | 'symbol'>) => {
    let route = '';

    route = buildSwapRoute({ from: getAddress(token), to: getAddress(token1) });
    history.push(route);
  };

  const updateToken1 = (token: Pick<ShortToken, 'address' | 'symbol'>) => {
    let route = '';

    route = buildSwapRoute({ from: getAddress(token0), to: getAddress(token) });
    history.push(route);
  };

  const reset = useCallback(() => {
    history.push(routes.swap);
    dispatch(actions.swap.reset());
  }, [dispatch, history]);

  return { token0, token1, updateToken0, updateToken1, reset };
}
