import { Token } from '@manekiswap/sdk';

export default function getAddress(token?: { address?: string; symbol?: string }) {
  if (!token) return undefined;
  if (token.symbol?.toUpperCase() === 'ETH') return 'ETH';
  return (token as Token).address;
}
