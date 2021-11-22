import 'react-tippy/dist/tippy.css';

import { AnimatedModalStack } from '@mattjennings/react-modal';
import { ThemeProvider } from '@theme-ui/theme-provider';
import { lazy, StrictMode, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Loading from './components/loadings/loading';
import theme from './components/theme';
import { useMediaQueryMaxWidth } from './hooks/useMediaQuery';
import routes from './routes';

const AppPage = lazy(() => import('./pages/app'));
// const LandingPage = lazy(() => import('./pages/landing-page'));
const LandingPageV3 = lazy(() => import('./pages/landing-page-v3'));
const NotFoundPage = lazy(() => import('./pages/404'));

export default function PagesRouter() {
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <AnimatedModalStack>
          <Router>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path={routes.landing} component={LandingPageV3} />
                {/* <Route exact path={routes.landing} component={LandingPage} /> */}
                <Route exact path={routes['not-found']} component={NotFoundPage} />
                <Route path={routes.app} component={AppPage} />
                <Redirect to={{ pathname: routes.landing }} />
              </Switch>
            </Suspense>
          </Router>
          <Toaster
            reverseOrder
            position={isUpToExtraSmall ? 'bottom-center' : 'top-right'}
            toastOptions={{
              duration: 20000,
            }}
            gutter={20}
          />
        </AnimatedModalStack>
      </ThemeProvider>
    </StrictMode>
  );
}
