import { getAddress } from '@ethersproject/address';

export function isAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
