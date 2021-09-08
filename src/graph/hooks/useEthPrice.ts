import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { ETH_PRICE } from '../queries';
import { getPercentChange } from '../utils/percents';
import { getBlockFromTimestamp } from './useBlocks';
import { useClients } from './useClients';

interface EthPrice {
  currentDayEthPrice: number;
  lastDayEthPrice: number;
  ethPriceChange: number;
}

/**
 * Gets the current price  of ETH, 24 hour price, and % change between them
 */
export default function useEthPrice() {
  const [prices, setPrices] = useState<{ [network: number]: EthPrice | undefined }>();
  const [fetchError, setFetchError] = useState(false);

  const { chainId } = useActiveWeb3React();

  const { dataClient, blockClient } = useClients();

  useEffect(() => {
    async function fetch() {
      const utcCurrentTime = dayjs();
      const utcOneDayBack = utcCurrentTime.subtract(1, 'day').startOf('minute').unix();
      const oneDayBlock = await getBlockFromTimestamp(utcOneDayBack, blockClient);

      const { data: result, error } = await dataClient.query({
        query: ETH_PRICE(),
        fetchPolicy: 'cache-first',
      });

      const { data: resultOneDay, error: errorOneDay } = await dataClient.query({
        query: ETH_PRICE(oneDayBlock),
        fetchPolicy: 'cache-first',
      });

      const currentDayEthPrice = result?.bundles[0]?.ethPrice;
      const lastDayEthPrice = resultOneDay?.bundles[0]?.ethPrice;

      if (error || errorOneDay) {
        setFetchError(true);
      } else {
        setPrices({
          [chainId ?? -1]: {
            currentDayEthPrice,
            lastDayEthPrice,
            ethPriceChange: getPercentChange(currentDayEthPrice, lastDayEthPrice),
          },
        });
      }
    }

    if (!prices && !fetchError) {
      fetch();
    }
  }, [blockClient, chainId, dataClient, fetchError, prices]);

  return prices?.[chainId ?? -1];
}
