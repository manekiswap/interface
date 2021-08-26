import ArgentWalletContractABI from '../abis/argent-wallet.json';
import { ArgentWalletContract } from '../abis/types/ArgentWalletContract';
import useActiveWeb3React from './useActiveWeb3React';
import { useContract } from './useContract';
import useIsArgentWallet from './useIsArgentWallet';

export function useArgentWalletContract(): ArgentWalletContract | null {
  const { account } = useActiveWeb3React();
  const isArgentWallet = useIsArgentWallet();
  return useContract<ArgentWalletContract>(
    isArgentWallet ? account ?? undefined : undefined,
    ArgentWalletContractABI,
    true,
  );
}
