import { Contract, ContractInterface } from '@ethersproject/contracts';
import { useMemo } from 'react';

import ARGENT_WALLET_DETECTOR_ABI from '../abis/argent-wallet-detector.json';
import EIP_2612 from '../abis/eip_2612.json';
import ENS_PUBLIC_RESOLVER_ABI from '../abis/ens-public-resolver.json';
import ENS_ABI from '../abis/ens-registrar.json';
import ERC20_ABI from '../abis/erc20.json';
import ERC20_BYTES32_ABI from '../abis/erc20_bytes32.json';
import MULTICALL_ABI from '../abis/multicall.json';
import MULTICALL2_ABI from '../abis/multicall2.json';
import WETH_ABI from '../abis/weth.json';
import { MULTICALL_NETWORKS, MULTICALL2_ADDRESS } from '../constants/addresses';
import { getContract } from '../utils/addresses';
import useActiveChainId from './useActiveChainId';
import useActiveWeb3React from './useActiveWeb3React';

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: ContractInterface,
  withSignerIfPossible = true,
): T | null {
  const { library, account } = useActiveWeb3React();
  const chainId = useActiveChainId();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined) as T;
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]);
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false);
}

export function useMulticall2Contract() {
  const chainId = useActiveChainId();
  return useContract(chainId && MULTICALL2_ADDRESS[chainId], MULTICALL2_ABI, false);
}
