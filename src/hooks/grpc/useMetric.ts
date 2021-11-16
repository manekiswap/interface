import { useEffect, useState } from 'react';

import { GetMetricRequest, GetMetricResponse } from '../../services/proto/CryptoInfo_pb';
import useClient from './client';

export default function useMetrics(metrics: string[], address?: string) {
  const [metric, setMetric] = useState<{ [key: string]: GetMetricResponse.AsObject }>({});
  const { cryptoInfoClient } = useClient();

  useEffect(() => {
    async function fetch(m: string) {
      if (!address) return;
      const request = new GetMetricRequest();
      request.setKeyword(address);
      request.setMetric(m);

      try {
        const response = await cryptoInfoClient.getMetric(request, null);
        setMetric((v) => ({ ...v, [m]: response.toObject() }));
      } catch (error) {
        console.log(error);
      }
    }

    for (const m of metrics) {
      fetch(m);
    }
  }, [address, cryptoInfoClient, metrics]);

  return metric;
}
