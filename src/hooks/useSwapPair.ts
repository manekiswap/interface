import { ParsedQs } from 'qs';
import { useEffect } from 'react';

import { Token } from '../constants/token';
import { actions } from '../reducers';
import { useAppDispatch } from '../reducers/hooks';
import { parseAddress } from '../utils/addresses';
import useActiveChainId from './useActiveChainId';
import useParsedQueryString from './useParsedQueryString';
import useTokenAddress from './useTokenAddress';

function parseCurrencyFromURLParameter(urlParam: any): string {
  if (typeof urlParam === 'string') {
    const address = parseAddress(urlParam);
    if (address) return address;
    if (urlParam.toUpperCase() === 'ETH') return 'ETH';
  }
  return '';
}

export function queryParametersToSwapState(parsedQs: ParsedQs): { from: string; to: string } {
  let inputCurrency = parseCurrencyFromURLParameter(parsedQs.from);
  let outputCurrency = parseCurrencyFromURLParameter(parsedQs.to);
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

export default function useSwapPair(): { token0?: Token; token1?: Token } {
  const chainId = useActiveChainId();
  const dispatch = useAppDispatch();
  const parsedQs = useParsedQueryString();
  const { from, to } = queryParametersToSwapState(parsedQs);

  const token0 = useTokenAddress(from);
  const token1 = useTokenAddress(to);

  useEffect(() => {
    if (!chainId) return;

    token0 && dispatch(actions.swap.update({ field: 'token0', token: token0.toShortToken() }));
    token1 && dispatch(actions.swap.update({ field: 'token1', token: token1.toShortToken() }));
  }, [dispatch, chainId, token0, token1]);

  return { token0, token1 };
}
