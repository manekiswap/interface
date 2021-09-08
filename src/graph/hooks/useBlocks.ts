import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { splitQuery } from '../../utils/queries';
import { GET_BLOCKS } from '../queries';
import { useClients } from './useClients';

/**
 * for a given array of timestamps, returns block entities
 * @param timestamps
 */
export function useBlocksFromTimestamps(
  timestamps: number[],
  blockClientOverride?: ApolloClient<NormalizedCacheObject>,
): {
  blocks?: Array<{ timestamp: string; number: any }>;
  error: boolean;
} {
  const { chainId } = useActiveWeb3React();
  const [blocks, setBlocks] = useState<{ [id: number]: {} }>();
  const [error, setError] = useState(false);

  const { blockClient } = useClients();
  const activeBlockClient = blockClientOverride ?? blockClient;

  // derive blocks based on active network
  const networkBlocks = blocks?.[chainId ?? -1];

  useEffect(() => {
    async function fetchData() {
      const results = await splitQuery(GET_BLOCKS, activeBlockClient, [], timestamps);
      if (results) {
        setBlocks({ ...(blocks ?? {}), [chainId ?? -1]: results });
      } else {
        setError(true);
      }
    }
    if (!networkBlocks && !error) {
      fetchData();
    }
  });

  const blocksFormatted = useMemo(() => {
    if (blocks?.[chainId ?? -1]) {
      const networkBlocks = blocks?.[chainId ?? -1];
      const formatted: Array<{ timestamp: string; number: number }> = [];
      for (const t in networkBlocks) {
        if (networkBlocks[t].length > 0) {
          formatted.push({
            timestamp: t.split('t')[1],
            number: networkBlocks[t][0]['number'],
          });
        }
      }
      return formatted;
    }
    return undefined;
  }, [chainId, blocks]);

  return {
    blocks: blocksFormatted,
    error,
  };
}
