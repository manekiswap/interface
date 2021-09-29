export enum TimeframeOptions {
  WEEK,
  MONTH,
  HALF_YEAR,
  ALL_TIME,
}

// tokens that should be tracked but arent due to lag in subgraph
export const TRACKED_OVERRIDES = [
  '0x9928e4046d7c6513326ccea028cd3e7a91c7590a',
  '0x87da823b6fc8eb8575a235a824690fda94674c88',
  '0xcd7989894bc033581532d2cd88da5db0a4b12859',
  '0xe1573b9d29e2183b1af0e743dc2754979a40d237',
  '0x45804880de22913dafe09f4980848ece6ecbaf78',
  '0x709f7b10f22eb62b05913b59b92ddd372d4e2152',
];

export const up = '↑';

export const down = '↓';

export enum PAIR_SORT_FIELD {
  LIQ,
  VOL,
  VOL_7DAYS,
  FEES,
  APY,
}

export enum TOKEN_SORT_FIELD {
  LIQ,
  VOL,
  VOL_UT,
  SYMBOL,
  NAME,
  PRICE,
  CHANGE,
}
