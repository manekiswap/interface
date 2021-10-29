import { useMemo } from 'react';

import { CryptoInfoClient } from '../../services/proto/CryptoInfoServiceClientPb';

function getClient() {
  const cryptoInfoClient = new CryptoInfoClient('http://localhost:8080');
  return { cryptoInfoClient };
}

export default function useClient() {
  const client = getClient();
  return useMemo(() => client, []);
}
