import { parseAddress } from './addresses';

export default function parseAddressFromURLParameter(urlParam: any): string {
  if (typeof urlParam === 'string') {
    const address = parseAddress(urlParam);
    if (address) return address;
    if (urlParam.toUpperCase() === 'ETH') return 'ETH';
  }
  return '';
}
