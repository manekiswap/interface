import { lazy, Suspense } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import routes from './routes';

const AppPage = lazy(() => import('./app'));
const LandingPage = lazy(() => import('./landing-page'));
const NotFoundPage = lazy(() => import('./404'));

export default function Pages() {
  return (
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
  );
}
