import { SupportedChainId } from '@manekiswap/sdk';

import { WETH9_EXTENDED } from '../constants/weth9';

const WETH_MAINNET = WETH9_EXTENDED[SupportedChainId.MAINNET];

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
