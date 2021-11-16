import { useEffect, useState } from 'react';

import { GetCryptoInfoRequest, GetCryptoInfoResponse } from '../../services/proto/CryptoInfo_pb';
import useClient from './client';

export default function useCryptoInfo(address?: string) {
  const [cryptoInfo, setCryptoInfo] = useState<GetCryptoInfoResponse.AsObject>();
  const { cryptoInfoClient } = useClient();

  useEffect(() => {
    async function fetch() {
      if (!address) return;
      const request = new GetCryptoInfoRequest();
      request.setAddress(address);

      try {
        const response = await cryptoInfoClient.getCryptoInfo(request, null);
        setCryptoInfo(response.toObject());
      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [address, cryptoInfoClient]);

  return cryptoInfo;
}
