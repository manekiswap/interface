// import {
//   dayDatasQuery,
//   ethPriceQuery,
//   factoryQuery,
//   liquidityPositionsQuery,
//   pairsQuery,
//   tokenPairsQuery,
//   tokenPriceQuery,
//   tokenQuery,
//   tokensQuery,
//   tokenSubsetQuery,
//   transactionsQuery,
// } from '../queries/exchange';
// import { useClients } from './useClients';

// export const usePairs = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const { data: pairs } = await dataClient.query({ query: pairsQuery, variables });
//   return pairs;
// };

// export const useTokenSubset = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const { data: tokens } = await dataClient.query({ query: tokenSubsetQuery, variables });
//   return tokens;
// };

// export const useTokens = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const { data: tokens } = await dataClient.query({ query: tokensQuery, variables });
//   return tokens;
// };

// export const useToken = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const { data: token } = await dataClient.query({ query: tokenQuery, variables });
//   return token;
// };

// export const useTokenPrices = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const { data: tokens } = await dataClient.query({ query: tokensQuery, variables });
//   return tokens.map((token) => token?.derivedETH);
// };

// export const useTokenPrice = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const ethPrice = await useEthPrice(undefined);

//   const { data: token } = await dataClient.query({ query: tokenPriceQuery, variables });
//   return token?.derivedETH * ethPrice;
// };

// export const useEthPrice = async (variables = undefined) => {
//   const { data: bundles } = await useBundle(variables);
//   return bundles?.[0]?.ethPrice;
// };

// export const useBundle = async (variables = { id: 1 }) => {
//   const { dataClient } = useClients();
//   return dataClient.query({ query: ethPriceQuery, variables });
// };

// export const useLiquidityPositions = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const { data: liquidityPositions } = await dataClient.query({ query: liquidityPositionsQuery, variables });
//   return liquidityPositions;
// };

// export const useDayData = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const { data: dayDatas } = await dataClient.query({ query: dayDatasQuery, variables });
//   return dayDatas;
// };

// export const useFactory = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const { data: factory } = await dataClient.query({ query: factoryQuery, variables });
//   return factory;
// };

// export const useTransactions = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const { data: swaps } = await dataClient.query({ query: transactionsQuery, variables });
//   return swaps;
// };

// export const useTokenPairs = async (variables = undefined) => {
//   const { dataClient } = useClients();
//   const {
//     data: { pairs1, pairs2 },
//   } = await dataClient.query({ query: tokenPairsQuery, variables });
//   return pairs1 || pairs2 ? [...(pairs1 ? pairs1 : []), ...(pairs2 ? pairs2 : [])] : undefined;
// };
