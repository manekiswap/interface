import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Pages from './pages';
import { persistor, store } from './reducers';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: '"DM Sans", sans-serif',
    body: '"DM Sans", sans-serif',
    mono: '"DM Sans", sans-serif',
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Pages />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
