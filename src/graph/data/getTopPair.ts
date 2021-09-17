import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { EthPrice } from '../hooks/useEthPrice';
import { PAIRS_CURRENT } from '../queries';
import { getBulkPairData } from './getBulkPairData';

export default async function getTopPairs(
  prices: EthPrice,
  blockClient: ApolloClient<NormalizedCacheObject>,
  dataClient: ApolloClient<NormalizedCacheObject>,
) {
  try {
    const result = await dataClient.query({
      query: PAIRS_CURRENT,
      fetchPolicy: 'cache-first',
    });

    // format as array of addresses
    const pairList = result?.data?.pairs.map((pair) => pair.id);

    return getBulkPairData(pairList, prices, blockClient, dataClient);
  } catch (e) {
    console.log(e);
    return [];
  }
}
