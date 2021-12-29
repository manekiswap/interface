import { useEffect, useState } from 'react';

import { GetCryptoInfoRequest, GetCryptoInfoResponse } from '../../services/proto/CryptoInfo_pb';
import useClient from './client';

export default function useCryptoInfo(keyword?: string) {
  const [cryptoInfo, setCryptoInfo] = useState<GetCryptoInfoResponse.AsObject>();
  const { cryptoInfoClient } = useClient();

  useEffect(() => {
    async function fetch() {
      if (!keyword) return;
      const request = new GetCryptoInfoRequest();
      request.setKeyword(keyword);

      try {
        const response = await cryptoInfoClient.getCryptoInfo(request, null);
        setCryptoInfo(response.toObject());
      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [cryptoInfoClient, keyword]);

  return cryptoInfo;
}
