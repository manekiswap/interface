import { AnimatedModalStack } from '@mattjennings/react-modal';
import { Web3ReactProvider } from '@web3-react/core';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'theme-ui';

import theme from './components/theme';
import Pages from './pages';
import { persistor, store } from './reducers';
import getLibrary from './utils/getLibrary';

export default function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<div />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <AnimatedModalStack>
              <Web3ReactProvider getLibrary={getLibrary}>
                <Pages />
              </Web3ReactProvider>
            </AnimatedModalStack>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}
