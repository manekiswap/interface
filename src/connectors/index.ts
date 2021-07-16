import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';

import { SupportedChainId } from '../constants/chains';
import getLibrary from '../utils/getLibrary';
import { NetworkConnector } from './NetworkConnector';

const ACHEMY_KEY = process.env.REACT_APP_ACHEMY_KEY;

if (typeof ACHEMY_KEY === 'undefined') {
  throw new Error(`REACT_APP_ACHEMY_KEY must be a defined environment variable`);
}

const NETWORK_URLS: {
  [chainId in SupportedChainId]: string;
} = {
  [SupportedChainId.MAINNET]: `https://eth-mainnet.alchemyapi.io/v2/${ACHEMY_KEY}`,
  [SupportedChainId.ROPSTEN]: `https://eth-ropsten.alchemyapi.io/v2/${ACHEMY_KEY}`,
  [SupportedChainId.RINKEBY]: `https://eth-rinkeby.alchemyapi.io/v2/${ACHEMY_KEY}`,
  [SupportedChainId.GÖRLI]: `https://eth-goerli.alchemyapi.io/v2/${ACHEMY_KEY}`,
  [SupportedChainId.KOVAN]: `https://eth-kovan.alchemyapi.io/v2/${ACHEMY_KEY}`,
};

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [SupportedChainId.MAINNET];

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider));
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});
