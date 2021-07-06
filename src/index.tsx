import './i18n';
import './index.less';

import { AnimatedModalStack } from '@mattjennings/react-modal';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'theme-ui';

import theme from './components/theme';
import Pages from './pages';
import { persistor, store } from './reducers';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <AnimatedModalStack>
            <Pages />
          </AnimatedModalStack>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.unregister();
