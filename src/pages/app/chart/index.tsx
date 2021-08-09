import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Flex } from 'theme-ui';

import Link from '../../../components/links/link';
import { GraphProvider } from '../../../graph/context';
import routes from '../../../routes';

const ChartOverviewPage = lazy(() => import('../chart-overview'));
const ChartPoolPage = lazy(() => import('../chart-pool'));
const ChartTokenPage = lazy(() => import('../chart-token'));
const PoolDetailPage = lazy(() => import('../pool-detail'));
const TokenDetailPage = lazy(() => import('../token-detail'));

export default function ChartPage() {
  const { t } = useTranslation(['app']);
  const { pathname } = useLocation();

  return (
    <GraphProvider>
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
              color: pathname === routes['chart-pool'] ? 'white.400' : 'white.300',
              backgroundColor: pathname === routes['chart-pool'] ? 'dark.transparent' : 'transparent',
              borderRadius: 'lg',
              fontWeight: 'normal',
              marginX: '4px',
            }}
            to={routes['chart-pool']}
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
              color: pathname === routes['chart-token'] ? 'white.400' : 'white.300',
              backgroundColor: pathname === routes['chart-token'] ? 'dark.transparent' : 'transparent',
              borderRadius: 'lg',
              fontWeight: 'normal',
            }}
            to={routes['chart-token']}
          >
            {t('app:chart-token')}
          </Link>
        </Flex>
        <Flex sx={{ marginTop: 12, width: '100%' }}>
          <Switch>
            <Route exact path={routes['chart-overview']} component={ChartOverviewPage} />
            <Route exact path={routes['chart-pool']} component={ChartPoolPage} />
            <Route exact path={routes['chart-token']} component={ChartTokenPage} />
            <Route path={routes['chart-pools']} component={PoolDetailPage} />
            <Route path={routes['chart-tokens']} component={TokenDetailPage} />
            <Redirect to={{ pathname: routes['chart-overview'] }} />
          </Switch>
        </Flex>
      </Flex>
    </GraphProvider>
  );
}
