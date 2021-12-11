import { useColorMode } from '@theme-ui/color-modes';
import { Flex } from '@theme-ui/components';
import { lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Web3ReactManager from '../../components/managers/web3react.manager';
import { AppCtx } from '../../context';
import useTheme from '../../hooks/useTheme';
import useToggle from '../../hooks/useToggle';
import ApplicationUpdater from '../../reducers/application/updater';
import ListUpdater from '../../reducers/list/updater';
import MulticallUpdater from '../../reducers/multicall/updater';
import TransactionUpdater from '../../reducers/transaction/updater';
import routes from '../../routes';
import Header from './header';
import SwapInformationPage from './swap-information';

const AddLiquidityPage = lazy(() => import('./add-liquidity'));
const ChartPage = lazy(() => import('./chart'));
const LiquidityPage = lazy(() => import('./liquidity'));
const ImportLiquidityPage = lazy(() => import('./import-liquidity'));
const PoolPage = lazy(() => import('./pool'));
const RemoveLiquidityPage = lazy(() => import('./remove-liquidity'));
const SwapPage = lazy(() => import('./swap'));

function Updaters(props: { enabled: boolean }) {
  return (
    <>
      {props.enabled && <ApplicationUpdater />}
      {props.enabled && <ListUpdater />}
      {props.enabled && <TransactionUpdater />}
      <MulticallUpdater />
    </>
  );
}

export default function AppRouter() {
  const [activeConnectWallet, toggleConnectWallet] = useToggle(false);

  const theme = useTheme();
  const [, setColorMode] = useColorMode();
  const matchChartRoute = useRouteMatch('/app/chart/:subRoute');

  useEffect(() => {
    setColorMode(theme as string);
  }, [setColorMode, theme]);

  return (
    <>
      <Helmet>
        <title>Manekiswap | App</title>
        <link rel="canonical" href="https://manekiswap.com/#/landing" />
      </Helmet>

      <Updaters enabled={!matchChartRoute?.isExact} />
      <Web3ReactManager>
        <Flex
          sx={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'background',
          }}
        >
          <AppCtx.Provider value={{ activeConnectWallet, toggleConnectWallet }}>
            <Header />
            <Switch>
              <Route exact path={routes.swap} component={SwapInformationPage} />
              <Route exact path={routes.swapNext} component={SwapPage} />
              <Route exact path={routes.pool} component={PoolPage} />
              <Route exact path={routes['pool-detail']} component={LiquidityPage} />
              <Route exact path={routes['pool-import']} component={ImportLiquidityPage} />
              <Route exact path={routes['pool-add']} component={AddLiquidityPage} />
              <Route exact path={routes['pool-remove']} component={RemoveLiquidityPage} />
              <Route path={routes.chart} component={ChartPage} />
              <Redirect to={{ pathname: routes.swap }} />
            </Switch>
          </AppCtx.Provider>
        </Flex>
      </Web3ReactManager>
    </>
  );
}
