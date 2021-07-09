import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Flex, useColorMode } from 'theme-ui';

import { useFetchAllTokenList } from '../../hooks/tokens/useFetchAllTokenList';
import { app } from '../../reducers';
import routes from '../routes';
import Header from './header';
import PoolPage from './pool';
import SwapPage from './swap';
import VotePage from './vote';

export default function AppPage() {
  const theme = useSelector(app.selectors.user.selectTheme);
  const [, setColorMode] = useColorMode();
  const match = useRouteMatch('/app/:subRoute');

  useEffect(() => {
    setColorMode(theme as string);
  }, [match?.isExact, setColorMode, theme]);

  useFetchAllTokenList();

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
