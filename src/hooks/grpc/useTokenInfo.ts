import { useEffect, useState } from 'react';
import { CryptoInfoRequest, CryptoInfoResponse } from '../../services/proto/CryptoInfo_pb';
import useClient from './client';

export default function useTokenInfo(address?: string) {
  const [tokenInfo, setTokenInfo] = useState<CryptoInfoResponse>();
  const { cryptoInfoClient } = useClient();

  useEffect(() => {
    async function fetch() {
      if (!address) return;
      const request = new CryptoInfoRequest();
      request.setAddress(address);

      request.setAddress('0x0d8775f648430679a709e98d2b0cb6250d2887ef'); // TODO: check with backend
      try {
        const response = await cryptoInfoClient.getCryptoInfo(request, null);
        setTokenInfo(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [address]);

  return tokenInfo;
}
