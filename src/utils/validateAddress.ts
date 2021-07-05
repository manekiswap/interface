const ADDRESS_REGEX = /^0x([A-Fa-f0-9]{40})$/;

export function validateAddress(address: string): boolean {
  return address.match(ADDRESS_REGEX) != null;
}
