import { ApolloClient, InMemoryCache } from '@apollo/client';

export const healthClient = new ApolloClient({
  uri: 'https://api.thegraph.com/index-node/graphql',
  cache: new InMemoryCache(),
});

export const blockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
  cache: new InMemoryCache(),
  queryDeduplication: true,
});

export const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2',
  cache: new InMemoryCache(),
  queryDeduplication: true,
});
