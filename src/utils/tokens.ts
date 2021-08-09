import { WETH } from '../constants/token';

export function formatTokenSymbol(address: string, symbol: string) {
  if (address === WETH.address) {
    return 'ETH';
  }
  return symbol;
}

export function formatTokenName(address: string, name: string) {
  if (address === WETH.address) {
    return 'Ether';
  }
  return name;
}
