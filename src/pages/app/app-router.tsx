import { lazy, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Flex, useColorMode } from 'theme-ui';

import Web3ReactManager from '../../components/managers/web3react.manager';
import useTheme from '../../hooks/useTheme';
import ApplicationUpdater from '../../reducers/application/updater';
import ListUpdater from '../../reducers/list/updater';
import MulticallUpdater from '../../reducers/multicall/updater';
import routes from '../../routes';
import Header from './header';

const ChartPage = lazy(() => import('./chart'));
const PoolPage = lazy(() => import('./pool'));
const SwapPage = lazy(() => import('./swap'));

function Updaters(props: { enabled: boolean }) {
  return (
    <>
      {props.enabled && <ApplicationUpdater />}
      {props.enabled && <ListUpdater />}
      <MulticallUpdater />
    </>
  );
}

export default function AppRouter() {
  const theme = useTheme();
  const [, setColorMode] = useColorMode();
  const matchAppRoute = useRouteMatch([routes.swap, routes.pool, '/app/chart/:subRoute']);
  const matchChartRoute = useRouteMatch('/app/chart/:subRoute');

  useEffect(() => {
    if (matchAppRoute?.isExact) setColorMode(theme as string);
  }, [matchAppRoute?.isExact, setColorMode, theme]);

  return (
    <>
      <Updaters enabled={!matchChartRoute?.isExact} />
      <Web3ReactManager>
        <Flex
          sx={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'background',
          }}
        >
          <Header />
          <Switch>
            <Route exact path={routes.pool} component={PoolPage} />
            <Route exact path={routes.swap} component={SwapPage} />
            <Route path={routes.chart} component={ChartPage} />
            <Redirect to={{ pathname: routes.swap }} />
          </Switch>
        </Flex>
      </Web3ReactManager>
    </>
  );
}
