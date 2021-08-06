import { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Flex, useColorMode } from 'theme-ui';

import Web3ReactManager from '../../components/managers/web3react.manager';
import useTheme from '../../hooks/useTheme';
import routes from '../../routes';
import ChartPage from './chart';
import Header from './header';
import PoolPage from './pool';
import SwapPage from './swap';

export default function AppRouter() {
  const theme = useTheme();
  const [, setColorMode] = useColorMode();
  const match = useRouteMatch('/app/:subRoute');

  useEffect(() => {
    setColorMode(theme as string);
  }, [match?.isExact, setColorMode, theme]);

  return (
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
  );
}
