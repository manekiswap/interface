import { useSelector } from 'react-redux';

import { SupportedChainId } from '../constants/chains';
import { Token } from '../constants/token';
import { selectors } from '../reducers';

export default function useSwapPair(): { token0?: Token; token1?: Token } {
  const { token0, token1 } = useSelector(selectors.swap.selectSwapPair);
  return {
    token0:
      token0 &&
      new Token(
        token0.chainId,
        token0.address,
        token0.decimals,
        token0.symbol,
        undefined,
        undefined,
        token0.chainId === SupportedChainId.MAINNET && token0.address === '',
      ),
    token1:
      token1 &&
      new Token(
        token1.chainId,
        token1.address,
        token1.decimals,
        token1.symbol,
        undefined,
        undefined,
        token1.chainId === SupportedChainId.MAINNET && token1.address === '',
      ),
  };
}
