import { Token } from '@manekiswap/sdk';

import { parseAddress } from './addresses';

export function getAddress(token?: { address?: string; symbol?: string }) {
  if (!token) return undefined;
  if (token.symbol?.toUpperCase() === 'MATIC') return 'MATIC';
  return parseAddress((token as Token).address);
}

export function parseAddressFromURLParameter(urlParam: any): string {
  if (typeof urlParam === 'string') {
    const address = parseAddress(urlParam);
    if (address) return address;
    if (urlParam.toUpperCase() === 'MATIC') return 'MATIC';
  }
  return '';
}
