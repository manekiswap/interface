import useActiveWeb3React from './useActiveWeb3React';

export default function useActiveChainId(): number | undefined {
  const { chainId } = useActiveWeb3React();
  return chainId;
}
