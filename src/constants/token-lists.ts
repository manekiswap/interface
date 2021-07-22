const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json';
const UMA_LIST = 'https://umaproject.org/uma.tokenlist.json';
const AAVE_LIST = 'tokenlist.aave.eth';
const SYNTHETIX_LIST = 'synths.snx.eth';
const WRAPPED_LIST = 'wrapped.tokensoft.eth';
const CMC_ALL_LIST = 'defi.cmc.eth';
const CMC_STABLECOIN = 'stablecoin.cmc.eth';
const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json';
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json';

export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST];

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  COMPOUND_LIST,
  UMA_LIST,
  AAVE_LIST,
  SYNTHETIX_LIST,
  WRAPPED_LIST,
  CMC_ALL_LIST,
  CMC_STABLECOIN,
  GEMINI_LIST,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
];

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [GEMINI_LIST];
