import { Token } from '@manekiswap/sdk';

// to be updated overtime
const knownInfos = [
  {
    symbol: 'WBTC',
    keyword: 'BTC',
  },
  {
    symbol: 'WETH',
    keyword: 'ETH',
  },
  {
    symbol: 'WMATIC',
    keyword: 'MATIC',
  },
];

export default function useWrappedTokenKeyword(token?: Token) {
  const knownInfo = knownInfos.find((i) => i.symbol === token?.symbol);
  if (knownInfo) return knownInfo.keyword;
  return token?.address;
}
