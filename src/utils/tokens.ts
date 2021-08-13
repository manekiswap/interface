import { SupportedChainId } from '../constants/chains';
import { ExtendedEther } from '../constants/extended-ether';

const WETH_MAINNET = ExtendedEther.onChain(SupportedChainId.MAINNET);

export function formatTokenSymbol(address: string, symbol: string) {
  if (address === WETH_MAINNET.address) {
    return 'ETH';
  }
  return symbol;
}

export function formatTokenName(address: string, name: string) {
  if (address === WETH_MAINNET.address) {
    return 'Ether';
  }
  return name;
}
