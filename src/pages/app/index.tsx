import { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Flex, useColorMode } from 'theme-ui';

import useTheme from '../../hooks/useTheme';
import routes from '../routes';
import Header from './header';
import PoolPage from './pool';
import SwapPage from './swap';
import VotePage from './vote';

export default function AppPage() {
  const theme = useTheme();
  const [, setColorMode] = useColorMode();
  const match = useRouteMatch('/app/:subRoute');

  useEffect(() => {
    setColorMode(theme as string);
  }, [match?.isExact, setColorMode, theme]);

  return (
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
        <Route exact path={routes.vote} component={VotePage} />
        <Redirect to={{ pathname: routes.swap }} />
      </Switch>
    </Flex>
  );
}
