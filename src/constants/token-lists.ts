const MANEKISWAP_LIST = 'https://tokens.manekiswap.com/manekiswap-default.tokenlist.json';
const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json';

const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json';

export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST];

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  COMPOUND_LIST,
  MANEKISWAP_LIST,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
];

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [MANEKISWAP_LIST, COMPOUND_LIST];
