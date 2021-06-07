import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from './routes';

const NotFoundPage = lazy(() => import('./404/404.page'));
const LandingPage = lazy(() => import('./landing-page/landing.page'));

export default function Pages() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route exact path={routes.landing} component={LandingPage} />
          <Route exact path={routes.root} component={LandingPage} />
          <Route exact path={routes['not-found']} component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
