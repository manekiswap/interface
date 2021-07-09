const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json';
const UMA_LIST = 'https://umaproject.org/uma.tokenlist.json';
const AAVE_LIST = 'tokenlist.aave.eth';
const SYNTHETIX_LIST = 'synths.snx.eth';
const WRAPPED_LIST = 'wrapped.tokensoft.eth';
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json';
const OPYN_LIST = 'https://raw.githubusercontent.com/opynfinance/opyn-tokenlist/master/opyn-v1.tokenlist.json';
const ROLL_LIST = 'https://app.tryroll.com/tokens.json';
// const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json';
const CMC_ALL_LIST = 'defi.cmc.eth';
const CMC_STABLECOIN = 'stablecoin.cmc.eth';
const KLEROS_LIST = 't2crtokens.eth';
const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json';
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json';

export const UNSUPPORTED_LIST_URLS = [BA_LIST];

export const DEFAULT_LIST_URLS_VALUES = [
  { id: 'COMPOUND_LIST', url: COMPOUND_LIST, weight: 0 },
  { id: 'AAVE_LIST', url: AAVE_LIST, weight: 1 },
  { id: 'SYNTHETIX_LIST', url: SYNTHETIX_LIST, weight: 2 },
  { id: 'UMA_LIST', url: UMA_LIST, weight: 3 },
  { id: 'WRAPPED_LIST', url: WRAPPED_LIST, weight: 4 },
  { id: 'SET_LIST', url: SET_LIST, weight: 5 },
  { id: 'OPYN_LIST', url: OPYN_LIST, weight: 6 },
  { id: 'ROLL_LIST', url: ROLL_LIST, weight: 7 },
  { id: 'CMC_ALL_LIST', url: CMC_ALL_LIST, weight: 8 },
  { id: 'CMC_STABLECOIN', url: CMC_STABLECOIN, weight: 9 },
  { id: 'KLEROS_LIST', url: KLEROS_LIST, weight: 10 },
  { id: 'GEMINI_LIST', url: GEMINI_LIST, weight: 11, active: true },
];
