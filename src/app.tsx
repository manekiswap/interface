import { AnimatedModalStack } from '@mattjennings/react-modal';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'theme-ui';

import theme from './components/theme';
import { NetworkContextName } from './hooks/useActiveWeb3React';
import Pages from './pages';
import { persistor, store } from './reducers';
import ApplicationUpdater from './reducers/application/updater';
import ListUpdater from './reducers/list/updater';
import MulticallUpdater from './reducers/multicall/updater';
import getLibrary from './utils/getLibrary';

const Web3ReactProviderReloaded = createWeb3ReactRoot(NetworkContextName);

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}
function Updater() {
  return (
    <>
      <ApplicationUpdater />
      <ListUpdater />
      <MulticallUpdater />
    </>
  );
}

export default function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<div />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <AnimatedModalStack>
              <Web3ReactProvider getLibrary={getLibrary}>
                <Web3ReactProviderReloaded getLibrary={getLibrary}>
                  <>
                    <Updater />
                    <Pages />
                  </>
                </Web3ReactProviderReloaded>
              </Web3ReactProvider>
            </AnimatedModalStack>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}
