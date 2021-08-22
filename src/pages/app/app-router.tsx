import { lazy, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Flex, useColorMode } from 'theme-ui';

import Web3ReactManager from '../../components/managers/web3react.manager';
import { AppProvider } from '../../context';
import useTheme from '../../hooks/useTheme';
import ApplicationUpdater from '../../reducers/application/updater';
import ListUpdater from '../../reducers/list/updater';
import MulticallUpdater from '../../reducers/multicall/updater';
import routes from '../../routes';
import Header from './header';

const AddLiquidityPage = lazy(() => import('./add-liquidity'));
const ChartPage = lazy(() => import('./chart'));
const PoolPage = lazy(() => import('./pool'));
const RemoveLiquidityPage = lazy(() => import('./remove-liquidity'));
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
  const matchChartRoute = useRouteMatch('/app/chart/:subRoute');

  useEffect(() => {
    setColorMode(theme as string);
  }, [setColorMode, theme]);

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
          <AppProvider>
            <Header />
            <Switch>
              <Route exact path={routes.swap} component={SwapPage} />
              <Route exact path={routes.pool} component={PoolPage} />
              <Route exact path={routes['pool-add']} component={AddLiquidityPage} />
              <Route exact path={routes['pool-remove']} component={RemoveLiquidityPage} />
              <Route path={routes.chart} component={ChartPage} />
              <Redirect to={{ pathname: routes.swap }} />
            </Switch>
          </AppProvider>
        </Flex>
      </Web3ReactManager>
    </>
  );
}
