import { Token } from '@manekiswap/sdk';

import { parseAddress } from './addresses';

export default function getAddress(token?: { address?: string; symbol?: string }) {
  if (!token) return undefined;
  if (token.symbol?.toUpperCase() === 'ETH') return 'ETH';
  return parseAddress((token as Token).address);
}
