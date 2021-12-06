import { isAddress } from '@ethersproject/address';
import { Currency, CurrencyAmount, JSBI } from '@manekiswap/sdk';
import { useMemo } from 'react';

import { ExtendedMatic } from '../constants/extended-ether';
import useActiveWeb3React from './useActiveWeb3React';
import { useMulticall2Contract } from './useContract';
import { useSingleContractMultipleData } from './web3/useSingleContractMultipleData';

export function useWalletBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: CurrencyAmount<Currency> | undefined;
} {
  const { chainId } = useActiveWeb3React();
  const multicallContract = useMulticall2Contract();

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ?.filter((a) => a && isAddress(a))
        .map((a) => a as string)
        .sort() ?? [],
    [uncheckedAddresses],
  );

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map((address) => [address]),
  );

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount<Currency> }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0];
        if (value && chainId) {
          memo[address] = CurrencyAmount.fromRawAmount(ExtendedMatic.onChain(chainId), JSBI.BigInt(value.toString()));
        }
        return memo;
      }, {}),
    [addresses, chainId, results],
  );
}
