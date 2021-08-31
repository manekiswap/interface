import { Contract, ContractInterface } from '@ethersproject/contracts';
import FACTORY_ABI from '@manekiswap/sdk/abis/IUniswapV2Factory.json';
import PAIR_ABI from '@manekiswap/sdk/abis/IUniswapV2Pair.json';
import ROUTER_ABI from '@manekiswap/sdk/abis/IUniswapV2Router02.json';
import { useMemo } from 'react';

import { ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS } from '../abis/argent-wallet-detector';
import ARGENT_WALLET_DETECTOR_ABI from '../abis/argent-wallet-detector.json';
import EIP_2612_ABI from '../abis/eip-2612.json';
import ENS_PUBLIC_RESOLVER_ABI from '../abis/ens-public-resolver.json';
import ENS_ABI from '../abis/ens-registrar.json';
import ERC20_ABI from '../abis/erc20.json';
import ERC20_BYTES32_ABI from '../abis/erc20_bytes32.json';
import MULTICALL_ABI from '../abis/multicall.json';
import MULTICALL2_ABI from '../abis/multicall2.json';
import { Weth } from '../abis/types';
import WETH_ABI from '../abis/weth.json';
import {
  ENS_REGISTRAR_ADDRESS,
  FACTORY_ADDRESS,
  MULTICALL_NETWORKS,
  MULTICALL2_ADDRESS,
  ROUTER_ADDRESS,
} from '../constants/addresses';
import { SupportedChainId } from '../constants/chains';
import { WETH9_EXTENDED } from '../constants/weth9';
import { getContract } from '../utils/addresses';
import useActiveWeb3React from './useActiveWeb3React';

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: ContractInterface,
  withSignerIfPossible = true,
): T | null {
  const { account, chainId, library } = useActiveWeb3React();

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
  return useContract(MULTICALL_NETWORKS[chainId ?? -1], MULTICALL_ABI, false);
}

export function useMulticall2Contract() {
  const { chainId } = useActiveWeb3React();
  return useContract(MULTICALL2_ADDRESS[chainId ?? -1], MULTICALL2_ABI, false);
}

export function useFactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(FACTORY_ADDRESS[chainId ?? -1], FACTORY_ABI.abi, false);
}

export function useRouterContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(ROUTER_ADDRESS[chainId ?? -1], ROUTER_ABI.abi, true);
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, PAIR_ABI.abi, withSignerIfPossible);
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612_ABI, false);
}

export function useArgentWalletDetectorContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId === SupportedChainId.MAINNET ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS : undefined,
    ARGENT_WALLET_DETECTOR_ABI,
    false,
  );
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(ENS_REGISTRAR_ADDRESS[chainId ?? -1], ENS_ABI, withSignerIfPossible);
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}

export function useWETHContract(withSignerIfPossible?: boolean): Weth | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId ? WETH9_EXTENDED[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible);
}
