import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'theme-ui';

import theme from './components/theme';
import Pages from './pages';
import { persistor, store } from './reducers';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Pages />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
