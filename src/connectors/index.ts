import { Web3Provider } from '@ethersproject/providers';
import { SupportedChainId } from '@manekiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import { ALL_SUPPORTED_CHAIN_IDS } from '../constants/chains';
import getLibrary from '../utils/getLibrary';
import { NetworkConnector } from './NetworkConnector';

const NETWORK_URLS: { [chainId in SupportedChainId]: string } = (function () {
  // const isProduction = process.env.NODE_ENV === 'production';

  // if (isProduction) {
  //   const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

  //   if (typeof INFURA_KEY === 'undefined') {
  //     throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`);
  //   }
  //   return {
  //     [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  //     [SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  //     [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  //     [SupportedChainId.GÖRLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  //     [SupportedChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  //   };
  // }
  const ACHEMY_KEY = process.env.REACT_APP_ACHEMY_KEY;

  if (typeof ACHEMY_KEY === 'undefined') {
    throw new Error(`REACT_APP_ACHEMY_KEY must be a defined environment variable`);
  }

  return {
    [SupportedChainId.MAINNET]: `https://eth-mainnet.alchemyapi.io/v2/${ACHEMY_KEY}`,
    [SupportedChainId.ROPSTEN]: `https://eth-ropsten.alchemyapi.io/v2/${ACHEMY_KEY}`,
    [SupportedChainId.RINKEBY]: `https://eth-rinkeby.alchemyapi.io/v2/${ACHEMY_KEY}`,
    [SupportedChainId.GÖRLI]: `https://eth-goerli.alchemyapi.io/v2/${ACHEMY_KEY}`,
    [SupportedChainId.KOVAN]: `https://eth-kovan.alchemyapi.io/v2/${ACHEMY_KEY}`,
  };
})();

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GÖRLI,
  SupportedChainId.KOVAN,
];

export const network = new NetworkConnector({
  urls: { ...NETWORK_URLS, [1337]: 'http://localhost:8545' },
  defaultChainId: 1,
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider));
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: NETWORK_URLS,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URLS[SupportedChainId.MAINNET],
  appName: 'Manekiswap',
  appLogoUrl: 'https://raw.githubusercontent.com/manekiswap/interface/master/src/assets/images/logo144x144.png',
});
