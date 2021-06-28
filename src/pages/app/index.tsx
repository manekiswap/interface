import { Redirect, Route, Switch } from 'react-router-dom';
import { Flex } from 'theme-ui';

import routes from '../routes';
import Header from './header';
import PoolPage from './pool';
import SwapPage from './swap';
import VotePage from './vote';

export default function AppPage() {
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
