import { AnimatedModalStack } from '@mattjennings/react-modal';
import { lazy, StrictMode, Suspense } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';

import theme from './components/theme';
import routes from './routes';

const AppPage = lazy(() => import('./pages/app'));
const LandingPage = lazy(() => import('./pages/landing-page'));
const NotFoundPage = lazy(() => import('./pages/404'));

export default function PagesRouter() {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <AnimatedModalStack>
          <Router>
            <Suspense fallback={<div></div>}>
              <Switch>
                <Route exact path={routes.landing} component={LandingPage} />
                <Route exact path={routes['not-found']} component={NotFoundPage} />
                <Route path={routes.app} component={AppPage} />
                <Redirect to={{ pathname: routes.landing }} />
              </Switch>
            </Suspense>
          </Router>
        </AnimatedModalStack>
      </ThemeProvider>
    </StrictMode>
  );
}
