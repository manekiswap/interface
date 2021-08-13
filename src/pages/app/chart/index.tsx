import { lazy, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { Flex } from 'theme-ui';

import Link from '../../../components/links/link';
import { GraphProvider } from '../../../graph/context';
import PoolUpdater from '../../../graph/updaters/pool';
import TokenUpdater from '../../../graph/updaters/token';
import routes from '../../../routes';

const ChartOverviewPage = lazy(() => import('../chart-overview'));
const ChartPoolPage = lazy(() => import('../chart-pool'));
const ChartTokenPage = lazy(() => import('../chart-token'));
const PoolDetailPage = lazy(() => import('../pool-detail'));
const TokenDetailPage = lazy(() => import('../token-detail'));

function Updaters() {
  return (
    <>
      <PoolUpdater />
      <TokenUpdater />
    </>
  );
}

export default function ChartPage() {
  const { t } = useTranslation(['app']);
  const { pathname } = useLocation();
  const matchChartRoute = useRouteMatch('/app/chart/:subRoute');

  const renderTabbar = useCallback(() => {
    if (!matchChartRoute?.isExact) return null;
    return (
      <Flex
        sx={{
          alignSelf: 'flex-start',
          height: 36,
          padding: '4px',
          backgroundColor: 'dark.500',
          borderRadius: 'lg',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          variant="buttons.small-ghost"
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            height: 28,
            width: 68,
            color: pathname === routes['chart-overview'] ? 'white.400' : 'white.300',
            backgroundColor: pathname === routes['chart-overview'] ? 'dark.transparent' : 'transparent',
            borderRadius: 'lg',
            fontWeight: 'normal',
          }}
          to={routes['chart-overview']}
        >
          {t('app:chart-overview')}
        </Link>
        <Link
          variant="buttons.small-ghost"
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            height: 28,
            width: 68,
            color: pathname === routes['chart-pools'] ? 'white.400' : 'white.300',
            backgroundColor: pathname === routes['chart-pools'] ? 'dark.transparent' : 'transparent',
            borderRadius: 'lg',
            fontWeight: 'normal',
            marginX: '4px',
          }}
          to={routes['chart-pools']}
        >
          {t('app:chart-pool')}
        </Link>
        <Link
          variant="buttons.small-ghost"
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            height: 28,
            width: 68,
            color: pathname === routes['chart-tokens'] ? 'white.400' : 'white.300',
            backgroundColor: pathname === routes['chart-tokens'] ? 'dark.transparent' : 'transparent',
            borderRadius: 'lg',
            fontWeight: 'normal',
          }}
          to={routes['chart-tokens']}
        >
          {t('app:chart-token')}
        </Link>
      </Flex>
    );
  }, [matchChartRoute, pathname, t]);

  return (
    <GraphProvider>
      <Updaters />
      <Flex
        sx={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'dark.400',
          paddingTop: 16,
          paddingX: 76,
        }}
      >
        {renderTabbar()}
        <Flex sx={{ marginTop: 12, width: '100%' }}>
          <Switch>
            <Route exact path={routes['chart-overview']} component={ChartOverviewPage} />
            <Route exact path={routes['chart-pools']} component={ChartPoolPage} />
            <Route exact path={routes['chart-tokens']} component={ChartTokenPage} />
            <Route path={routes['chart-pool']} component={PoolDetailPage} />
            <Route path={routes['chart-token']} component={TokenDetailPage} />
            <Redirect to={{ pathname: routes['chart-overview'] }} />
          </Switch>
        </Flex>
      </Flex>
    </GraphProvider>
  );
}
