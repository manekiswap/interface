import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Flex, useColorMode } from 'theme-ui';

import { NetworkContextName } from '../..//hooks/useActiveWeb3React';
import ApplicationUpdater from '../..//reducers/application/updater';
import ListUpdater from '../..//reducers/list/updater';
import MulticallUpdater from '../..//reducers/multicall/updater';
import Web3ReactManager from '../../components/managers/web3react.manager';
import useTheme from '../../hooks/useTheme';
import getLibrary from '../../utils/getLibrary';
import routes from '../routes';
import Header from './header';
import PoolPage from './pool';
import SwapPage from './swap';
import VotePage from './vote';

const Web3ReactProviderReloaded = createWeb3ReactRoot(NetworkContextName);

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function Updater() {
  return (
    <>
      <ApplicationUpdater />
      <ListUpdater />
      <MulticallUpdater />
    </>
  );
}

export default function AppPage() {
  const theme = useTheme();
  const [, setColorMode] = useColorMode();
  const match = useRouteMatch('/app/:subRoute');

  useEffect(() => {
    setColorMode(theme as string);
  }, [match?.isExact, setColorMode, theme]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactProviderReloaded getLibrary={getLibrary}>
        <Web3ReactManager>
          <>
            <Updater />
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
          </>
        </Web3ReactManager>
      </Web3ReactProviderReloaded>
    </Web3ReactProvider>
  );
}
