import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import dayjs from 'dayjs';

import { EthPrice } from '../hooks/useEthPrice';
import { TOKEN_DATA, TOKEN_TOP_DAY_DATAS, TOKENS_HISTORICAL_BULK } from '../queries';
import { getBlockFromTimestamp } from './getBlocks';
import parseTokenData from './parse/token';

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

    const bulkResults =
      !currentData || !oneDayData || !twoDayData
        ? await Promise.resolve([])
        : await Promise.all(
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

              return parseTokenData(token, oneDayHistory, twoDayHistory, ethPrice, oldEthPrice);
            }),
          );

    return bulkResults;
  } catch (e) {
    console.log(e);
    return [];
  }
}
