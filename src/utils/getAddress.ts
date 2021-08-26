import { Token } from '@uniswap/sdk-core';

export default function getAddress(token?: { address?: string; symbol?: string }) {
  if (!token) return undefined;
  if (token.symbol?.toUpperCase() === 'ETH') return 'ETH';
  if (token.symbol?.toUpperCase() === 'WETH') return 'ETH';
  return (token as Token).address;
}
