import { WETH9 } from '@manekiswap/sdk';

import { SupportedChainId } from '../constants/chains';

const WETH_MAINNET = WETH9[SupportedChainId.MAINNET];

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
