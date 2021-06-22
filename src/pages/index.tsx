import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './routes';

const LandingPage = lazy(() => import('./landing-page'));
const NotFoundPage = lazy(() => import('./404'));
const SamplePage = lazy(() => import('./sample'));

export default function Pages() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route exact path={routes.landing} component={LandingPage} />
          <Route exact path={routes.root} component={LandingPage} />
          <Route exact path={routes['not-found']} component={NotFoundPage} />
          <Route exact path={routes['sample']} component={SamplePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}
