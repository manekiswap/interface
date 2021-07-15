import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import useActiveChainId from '../../hooks/useActiveChainId';
import { selectors } from '../../reducers';
import { CallState, toCallState } from '../../reducers/multicall/call';
import { ListenerOptions } from '../../reducers/multicall/types';
import { Call } from '../../reducers/multicall/utils';
import useCallsData, { isValidMethodArgs, OptionalMethodInputs } from './useCallsData';

export default function useSingleCallResult(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs,
  options?: Partial<ListenerOptions> & { gasRequired?: number },
): CallState {
  const chainId = useActiveChainId();
  const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName]);

  const blocksPerFetch = options?.blocksPerFetch;
  const gasRequired = options?.gasRequired;

  const calls = useMemo<Call[]>(() => {
    return contract && fragment && isValidMethodArgs(inputs)
      ? [
          {
            address: contract.address,
            callData: contract.interface.encodeFunctionData(fragment, inputs),
            ...(gasRequired ? { gasRequired } : {}),
          },
        ]
      : [];
  }, [contract, fragment, inputs, gasRequired]);

  const result = useCallsData(calls, blocksPerFetch ? { blocksPerFetch } : undefined)[0];
  const latestBlockNumber = useSelector(selectors.application.selectBlockNumberMap)[chainId];

  return useMemo(() => {
    return toCallState(result, contract?.interface, fragment, latestBlockNumber);
  }, [result, contract, fragment, latestBlockNumber]);
}
