import { SupportedChainId } from './chains';

type AddressMap = { [chainId in SupportedChainId]: string };

export const MULTICALL_NETWORKS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [SupportedChainId.ROPSTEN]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  [SupportedChainId.RINKEBY]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [SupportedChainId.GÖRLI]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [SupportedChainId.KOVAN]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
};

export const MULTICALL2_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [SupportedChainId.ROPSTEN]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [SupportedChainId.RINKEBY]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [SupportedChainId.GÖRLI]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [SupportedChainId.KOVAN]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
};
