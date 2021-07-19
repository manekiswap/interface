import useActiveWeb3React from './useActiveWeb3React';

export default function useActiveChainId(): number {
  const { chainId } = useActiveWeb3React();
  return chainId ?? -1;
}
