import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { NetworkContextName } from '../../constants';
import { persistor, store } from '../../reducers';
import ApplicationUpdater from '../../reducers/application/updater';
import ListUpdater from '../../reducers/list/updater';
import MulticallUpdater from '../../reducers/multicall/updater';
import getLibrary from '../../utils/getLibrary';
import AppRouter from './app-router';

const Web3ReactProviderReloaded = createWeb3ReactRoot(NetworkContextName);
if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <ListUpdater />
      <MulticallUpdater />
    </>
  );
}

export default function Pages() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ReactProviderReloaded getLibrary={getLibrary}>
            <>
              <Updaters />
              <AppRouter />
            </>
          </Web3ReactProviderReloaded>
        </Web3ReactProvider>
      </PersistGate>
    </Provider>
  );
}
