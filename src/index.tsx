import './i18n';
import './index.less';

import { render } from 'react-dom';

import App from './app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

(function () {
  render(<App />, document.getElementById('root'));
  serviceWorkerRegistration.unregister();
})();
