import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { SupportedChainId } from '@manekiswap/sdk';

export default function getClients(chainId?: number): {
  blockClient?: ApolloClient<NormalizedCacheObject>;
  dataClient?: ApolloClient<NormalizedCacheObject>;
  healthClient?: ApolloClient<NormalizedCacheObject>;
} {
  if (chainId === SupportedChainId.MAINNET) {
    return {
      blockClient: new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
        cache: new InMemoryCache(),
        queryDeduplication: true,
      }),
      dataClient: new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2',
        cache: new InMemoryCache(),
        queryDeduplication: true,
      }),
      healthClient: new ApolloClient({
        uri: 'https://api.thegraph.com/index-node/graphql',
        cache: new InMemoryCache(),
      }),
    };
  } else if (chainId === SupportedChainId.RINKEBY) {
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
  }

  return {};
}
