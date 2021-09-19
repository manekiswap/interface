import { ApolloClient, InMemoryCache } from '@apollo/client';

const { blockClient, client, healthClient } = (function () {
  const healthClient = new ApolloClient({
    uri: 'https://api.thegraph.com/index-node/graphql',
    cache: new InMemoryCache(),
  });

  if (process.env.NODE_ENV === 'production') {
    return {
      blockClient: new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
        cache: new InMemoryCache(),
        queryDeduplication: true,
      }),
      client: new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2',
        cache: new InMemoryCache(),
        queryDeduplication: true,
      }),
      healthClient,
    };
  }

  const client = new ApolloClient({
    uri: 'https://graph.manekiswap.com',
    cache: new InMemoryCache(),
    queryDeduplication: true,
  });
  return {
    blockClient: client,
    client,
    healthClient,
  };
})();

export { blockClient, client, healthClient };
