import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import dayjs from 'dayjs';

import { EthPrice } from '../hooks/useEthPrice';
import { TOKEN_DATA } from '../queries';
import { TokenData } from '../reducers/types';
import updateNameData from '../utils/data';
import { get2DayPercentChange, getPercentChange } from '../utils/percents';
import { getBlockFromTimestamp } from './getBlocks';

type TokenDataResponse = {
  id: string;
  pairCount: number;
  totalVolumeUSD: string;
  totalVolumeETH: string;
  totalLiquidityUSD: string;
  totalLiquidityETH: string;
  txCount: string;
  untrackedVolumeUSD: string;
};

export async function getTokenData(
  address: string,
  prices: EthPrice,
  blockClient: ApolloClient<NormalizedCacheObject>,
  dataClient: ApolloClient<NormalizedCacheObject>,
) {
  const { currentDayEthPrice: ethPrice, lastDayEthPrice: oldEthPrice } = prices;

  const utcCurrentTime = dayjs();
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').startOf('minute').unix();
  const utcTwoDaysBack = utcCurrentTime.subtract(2, 'day').startOf('minute').unix();
  const oneDayBlock = await getBlockFromTimestamp(utcOneDayBack, blockClient);
  const twoDayBlock = await getBlockFromTimestamp(utcTwoDaysBack, dataClient);

  // initialize data arrays
  let data: any = {};
  let oneDayHistory: any = {};
  let twoDayHistory: any = {};

  try {
    // fetch all current and historical data
    const result = await dataClient.query({
      query: TOKEN_DATA(address),
      fetchPolicy: 'cache-first',
    });
    data = result?.data?.tokens?.[0];

    // get results from 24 hours in past
    const oneDayResult = await dataClient.query({
      query: TOKEN_DATA(address, oneDayBlock),
      fetchPolicy: 'cache-first',
    });
    oneDayHistory = oneDayResult.data.tokens[0];

    // get results from 48 hours in past
    const twoDayResult = await dataClient.query({
      query: TOKEN_DATA(address, twoDayBlock),
      fetchPolicy: 'cache-first',
    });
    twoDayHistory = twoDayResult.data.tokens[0];

    // catch the case where token wasnt in top list in previous days
    if (!oneDayHistory) {
      const oneDayResult = await dataClient.query({
        query: TOKEN_DATA(address, oneDayBlock),
        fetchPolicy: 'cache-first',
      });
      oneDayHistory = oneDayResult.data.tokens[0];
    }
    if (!twoDayHistory) {
      const twoDayResult = await dataClient.query({
        query: TOKEN_DATA(address, twoDayBlock),
        fetchPolicy: 'cache-first',
      });
      twoDayHistory = twoDayResult.data.tokens[0];
    }
    data = parseData(address, data, oneDayHistory, twoDayHistory, ethPrice, oldEthPrice);
  } catch (e) {
    console.log(e);
  }

  return data;
}

function parseData(address, _data, oneDayHistory, twoDayHistory, ethPrice, oldEthPrice) {
  let data = { ..._data };
  data.oneDayData = { ...oneDayHistory };
  data.twoDayData = { ...twoDayHistory };

  // calculate percentage changes and daily changes
  const [oneDayVolumeUSD, volumeChangeUSD] = get2DayPercentChange(
    data?.tradeVolumeUSD ?? 0,
    oneDayHistory?.tradeVolumeUSD ?? 0,
    twoDayHistory?.tradeVolumeUSD ?? 0,
  );

  // calculate percentage changes and daily changes
  const [oneDayVolumeUT, volumeChangeUT] = get2DayPercentChange(
    data?.untrackedVolumeUSD ?? 0,
    oneDayHistory?.untrackedVolumeUSD ?? 0,
    twoDayHistory?.untrackedVolumeUSD ?? 0,
  );

  // calculate percentage changes and daily changes
  const [oneDayTxns, txnChange] = get2DayPercentChange(
    data?.txCount ?? 0,
    oneDayHistory?.txCount ?? 0,
    twoDayHistory?.txCount ?? 0,
  );

  const priceChangeUSD = getPercentChange(
    parseFloat(data?.derivedETH ?? '0') * ethPrice,
    parseFloat(oneDayHistory?.derivedETH ?? '0') * oldEthPrice,
  );

  const currentLiquidityUSD = (data?.totalLiquidity ?? 0) * ethPrice * parseFloat(data?.derivedETH ?? '0');
  const oldLiquidityUSD =
    (oneDayHistory?.totalLiquidity ?? 0) * oldEthPrice * parseFloat(oneDayHistory?.derivedETH ?? '0');

  // set data
  data.priceUSD = parseFloat(data?.derivedETH ?? '0') * ethPrice;
  data.totalLiquidityUSD = currentLiquidityUSD;
  data.oneDayVolumeUSD = oneDayVolumeUSD;
  data.volumeChangeUSD = volumeChangeUSD;
  data.priceChangeUSD = priceChangeUSD;
  data.oneDayVolumeUT = oneDayVolumeUT;
  data.volumeChangeUT = volumeChangeUT;
  const liquidityChangeUSD = getPercentChange(currentLiquidityUSD ?? 0, oldLiquidityUSD ?? 0);
  data.liquidityChangeUSD = liquidityChangeUSD;
  data.oneDayTxns = oneDayTxns;
  data.txnChange = txnChange;

  // used for custom adjustments
  data.oneDayData = oneDayHistory?.[address];
  data.twoDayData = twoDayHistory?.[address];

  // new tokens
  if (!oneDayHistory && data) {
    data.oneDayVolumeUSD = parseFloat(data.tradeVolumeUSD ?? '0');
    data.oneDayVolumeETH = parseFloat(data.tradeVolume ?? '0') * parseFloat(data?.derivedETH ?? '0');
    data.oneDayTxns = data.txCount;
  }

  // update name data for
  data = updateNameData({ token0: data })?.token0 ?? data;

  return data;
}
