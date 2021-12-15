import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { SupportedChainId } from '@manekiswap/sdk';

export default function getClients(chainId?: number): {
  blockClient?: ApolloClient<NormalizedCacheObject>;
  dataClient?: ApolloClient<NormalizedCacheObject>;
  healthClient?: ApolloClient<NormalizedCacheObject>;
} {
  if (chainId === SupportedChainId.RINKEBY) {
    return {
      blockClient: new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/rinkeby-blocks',
        cache: new InMemoryCache(),
        queryDeduplication: true,
      }),
      dataClient: new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/croccifixio-maneki/manekirinkeby',
        cache: new InMemoryCache(),
        queryDeduplication: true,
      }),
    };
  } else if (chainId === SupportedChainId.POLYGON) {
    return {
      blockClient: new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/croccifixio-maneki/maticblocks',
        cache: new InMemoryCache(),
        queryDeduplication: true,
      }),
      dataClient: new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/croccifixio-maneki/maneki',
        cache: new InMemoryCache(),
        queryDeduplication: true,
      }),
    };
  }

  return {};
}
