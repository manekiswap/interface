import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import dayjs from 'dayjs';

import { EthPrice } from '../hooks/useEthPrice';
import { TOKEN_DATA, TOKEN_TOP_DAY_DATAS, TOKENS_HISTORICAL_BULK } from '../queries';
import updateNameData from '../utils/data';
import { get2DayPercentChange, getPercentChange } from '../utils/percents';
import { getBlockFromTimestamp } from './getBlocks';

export default async function getTopTokens(
  prices: EthPrice,
  blockClient: ApolloClient<NormalizedCacheObject>,
  dataClient: ApolloClient<NormalizedCacheObject>,
) {
  const { currentDayEthPrice: ethPrice, lastDayEthPrice: oldEthPrice } = prices;

  const utcCurrentTime = dayjs();
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').unix();
  const utcTwoDaysBack = utcCurrentTime.subtract(2, 'day').unix();

  try {
    const oneDayBlock = await getBlockFromTimestamp(utcOneDayBack, blockClient);
    const twoDayBlock = await getBlockFromTimestamp(utcTwoDaysBack, blockClient);

    // need to get the top tokens by liquidity by need token day datas
    const currentDate = parseInt((Date.now() / 86400 / 1000) as any) * 86400 - 86400;

    const tokenIds = await dataClient.query({
      query: TOKEN_TOP_DAY_DATAS,
      fetchPolicy: 'network-only',
      variables: { date: currentDate },
    });

    const ids = tokenIds?.data?.tokenDayDatas?.reduce((accum, entry) => {
      accum.push(entry.id.slice(0, 42));
      return accum;
    }, []);

    const currentResult = await dataClient.query({
      query: TOKENS_HISTORICAL_BULK(ids),
      fetchPolicy: 'cache-first',
    });

    const oneDayResult = await dataClient.query({
      query: TOKENS_HISTORICAL_BULK(ids, oneDayBlock),
      fetchPolicy: 'cache-first',
    });

    const twoDayResult = await dataClient.query({
      query: TOKENS_HISTORICAL_BULK(ids, twoDayBlock),
      fetchPolicy: 'cache-first',
    });

    const currentData = currentResult?.data?.tokens;

    const oneDayData = oneDayResult?.data?.tokens.reduce((obj, cur, i) => {
      return { ...obj, [cur.id]: cur };
    }, {});

    const twoDayData = twoDayResult?.data?.tokens.reduce((obj, cur, i) => {
      return { ...obj, [cur.id]: cur };
    }, {});

    const bulkResults = await Promise.all(
      currentData &&
        oneDayData &&
        twoDayData &&
        currentData.map(async (token) => {
          // let liquidityDataThisToken = liquidityData?.[token.id]
          let oneDayHistory = oneDayData?.[token.id];
          let twoDayHistory = twoDayData?.[token.id];

          // catch the case where token wasnt in top list in previous days
          if (!oneDayHistory) {
            const oneDayResult = await dataClient.query({
              query: TOKEN_DATA(token.id, oneDayBlock),
              fetchPolicy: 'cache-first',
            });
            oneDayHistory = oneDayResult.data.tokens[0];
          }
          if (!twoDayHistory) {
            const twoDayResult = await dataClient.query({
              query: TOKEN_DATA(token.id, twoDayBlock),
              fetchPolicy: 'cache-first',
            });
            twoDayHistory = twoDayResult.data.tokens[0];
          }

          return parseData(token, oneDayHistory, twoDayHistory, ethPrice, oldEthPrice);
        }),
    );

    return bulkResults;

    // calculate percentage changes and daily changes
  } catch (e) {
    console.log(e);
    return [];
  }
}

function parseData(_data, oneDayHistory, twoDayHistory, ethPrice, oldEthPrice) {
  const data = { ..._data };

  // calculate percentage changes and daily changes
  const [oneDayVolumeUSD, volumeChangeUSD] = get2DayPercentChange(
    data.tradeVolumeUSD,
    oneDayHistory?.tradeVolumeUSD ?? 0,
    twoDayHistory?.tradeVolumeUSD ?? 0,
  );
  const [oneDayTxns, txnChange] = get2DayPercentChange(
    data.txCount,
    oneDayHistory?.txCount ?? 0,
    twoDayHistory?.txCount ?? 0,
  );

  const currentLiquidityUSD = data?.totalLiquidity * ethPrice * data?.derivedETH;
  const oldLiquidityUSD = oneDayHistory?.totalLiquidity * oldEthPrice * oneDayHistory?.derivedETH;

  // percent changes
  const priceChangeUSD = getPercentChange(
    data?.derivedETH * ethPrice,
    oneDayHistory?.derivedETH ? oneDayHistory?.derivedETH * oldEthPrice : 0,
  );

  // set data
  data.priceUSD = data?.derivedETH * ethPrice;
  data.totalLiquidity = parseFloat(data?.totalLiquidity);
  data.totalLiquidityUSD = currentLiquidityUSD;
  data.oneDayVolumeUSD = oneDayVolumeUSD;
  data.volumeChangeUSD = volumeChangeUSD;
  data.priceChangeUSD = priceChangeUSD;
  data.liquidityChangeUSD = getPercentChange(currentLiquidityUSD ?? 0, oldLiquidityUSD ?? 0);
  data.oneDayTxns = oneDayTxns;
  data.txnChange = txnChange;

  // new tokens
  if (!oneDayHistory && data) {
    data.oneDayVolumeUSD = data.tradeVolumeUSD;
    data.oneDayVolumeETH = data.tradeVolume * data.derivedETH;
    data.oneDayTxns = data.txCount;
  }

  // format incorrect names
  updateNameData({ token0: data });

  // used for custom adjustments
  data.oneDayData = oneDayHistory;
  data.twoDayData = twoDayHistory;

  return data;
}
