// eslint-disable-next-line simple-import-sort/imports
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './i18n';
import App from './app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.unregister();
