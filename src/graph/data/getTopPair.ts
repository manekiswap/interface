import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { TRACKED_OVERRIDES } from '../constants';
import { EthPrice } from '../hooks/useEthPrice';
import { PAIR_DATA, PAIRS_BULK, PAIRS_CURRENT, PAIRS_HISTORICAL_BULK } from '../queries';
import updateNameData from '../utils/data';
import { get2DayPercentChange, getPercentChange } from '../utils/percents';
import { getTimestampsForChanges } from '../utils/timestamps';
import { getBlocksFromTimestamps } from './getBlocks';

export default async function getTopPairs(
  prices: EthPrice,
  blockClient: ApolloClient<NormalizedCacheObject>,
  dataClient: ApolloClient<NormalizedCacheObject>,
) {
  const { currentDayEthPrice: ethPrice } = prices;
  const [t1, t2, tWeek] = getTimestampsForChanges();

  try {
    const result = await dataClient.query({
      query: PAIRS_CURRENT,
      fetchPolicy: 'cache-first',
    });

    // format as array of addresses
    const pairList = result?.data?.pairs.map((pair) => pair.id);

    // get data for every pair in list
    const [{ number: b1 }, { number: b2 }, { number: bWeek }] = await getBlocksFromTimestamps(
      [t1, t2, tWeek],
      blockClient,
    );

    const currentResult = await dataClient.query({
      query: PAIRS_BULK,
      variables: {
        allPairs: pairList,
      },
      fetchPolicy: 'cache-first',
    });

    const [oneDayResult, twoDayResult, oneWeekResult] = await Promise.all(
      [b1, b2, bWeek].map(async (block) => {
        const result = dataClient.query({
          query: PAIRS_HISTORICAL_BULK(block, pairList),
          fetchPolicy: 'cache-first',
        });
        return result;
      }),
    );

    const currentData = currentResult?.data?.pairs;

    const oneDayData = oneDayResult?.data?.pairs.reduce((obj, cur, i) => {
      return { ...obj, [cur.id]: cur };
    }, {});

    const twoDayData = twoDayResult?.data?.pairs.reduce((obj, cur, i) => {
      return { ...obj, [cur.id]: cur };
    }, {});

    const oneWeekData = oneWeekResult?.data?.pairs.reduce((obj, cur, i) => {
      return { ...obj, [cur.id]: cur };
    }, {});

    const bulkResults =
      !currentData || !oneDayData || !twoDayData || !oneWeekData
        ? await Promise.resolve([])
        : await Promise.all(
            currentData.map(async (pair) => {
              let oneDayHistory = oneDayData?.[pair.id];
              if (!oneDayHistory) {
                const newData = await dataClient.query({
                  query: PAIR_DATA(pair.id, b1),
                  fetchPolicy: 'cache-first',
                });
                oneDayHistory = newData.data.pairs[0];
              }
              let twoDayHistory = twoDayData?.[pair.id];
              if (!twoDayHistory) {
                const newData = await dataClient.query({
                  query: PAIR_DATA(pair.id, b2),
                  fetchPolicy: 'cache-first',
                });
                twoDayHistory = newData.data.pairs[0];
              }
              let oneWeekHistory = oneWeekData?.[pair.id];
              if (!oneWeekHistory) {
                const newData = await dataClient.query({
                  query: PAIR_DATA(pair.id, bWeek),
                  fetchPolicy: 'cache-first',
                });
                oneWeekHistory = newData.data.pairs[0];
              }
              return parseData(pair, oneDayHistory, twoDayHistory, oneWeekHistory, ethPrice, b1);
            }),
          );

    return bulkResults;
  } catch (e) {
    console.log(e);
    return [];
  }
}

function parseData(_data, oneDayData, twoDayData, oneWeekData, ethPrice, oneDayBlock) {
  let data = { ..._data };

  data.volumeUSD = parseFloat(data.volumeUSD);
  data.createdAtTimestamp = parseInt(data.createdAtTimestamp);

  // get volume changes
  const [oneDayVolumeUSD, volumeChangeUSD] = get2DayPercentChange(
    data?.volumeUSD,
    oneDayData?.volumeUSD ? oneDayData.volumeUSD : 0,
    twoDayData?.volumeUSD ? twoDayData.volumeUSD : 0,
  );
  const [oneDayVolumeUntracked, volumeChangeUntracked] = get2DayPercentChange(
    data?.untrackedVolumeUSD,
    oneDayData?.untrackedVolumeUSD ? parseFloat(oneDayData?.untrackedVolumeUSD) : 0,
    twoDayData?.untrackedVolumeUSD ? twoDayData?.untrackedVolumeUSD : 0,
  );

  const oneWeekVolumeUSD = parseFloat(oneWeekData ? data?.volumeUSD - oneWeekData?.volumeUSD : data.volumeUSD);

  const oneWeekVolumeUntracked = parseFloat(
    oneWeekData ? data?.untrackedVolumeUSD - oneWeekData?.untrackedVolumeUSD : data.untrackedVolumeUSD,
  );

  // set volume properties
  data.oneDayVolumeUSD = oneDayVolumeUSD;
  data.oneWeekVolumeUSD = oneWeekVolumeUSD;
  data.volumeChangeUSD = volumeChangeUSD;
  data.oneDayVolumeUntracked = oneDayVolumeUntracked;
  data.oneWeekVolumeUntracked = oneWeekVolumeUntracked;
  data.volumeChangeUntracked = volumeChangeUntracked;

  // set liquidity properties
  data.trackedReserveETH = parseFloat(data.trackedReserveETH);
  data.trackedReserveUSD = data.trackedReserveETH * ethPrice;
  data.reserveETH = parseFloat(data.reserveETH);
  data.reserveUSD = parseFloat(data.reserveUSD);
  data.liquidityChangeUSD = getPercentChange(data.reserveUSD, oneDayData?.reserveUSD);

  // format if pair hasnt existed for a day or a week
  if (!oneDayData && data && data.createdAtBlockNumber > oneDayBlock) {
    data.oneDayVolumeUSD = parseFloat(data.volumeUSD);
  }
  if (!oneDayData && data) {
    data.oneDayVolumeUSD = parseFloat(data.volumeUSD);
  }
  if (!oneWeekData && data) {
    data.oneWeekVolumeUSD = parseFloat(data.volumeUSD);
  }

  if (TRACKED_OVERRIDES.includes(data.id)) {
    data.oneDayVolumeUSD = oneDayVolumeUntracked;
    data.oneWeekVolumeUSD = oneWeekVolumeUntracked;
    data.volumeChangeUSD = volumeChangeUntracked;
    data.trackedReserveUSD = data.reserveUSD;
  }

  // format incorrect names
  data = updateNameData(data);

  return data;
}
