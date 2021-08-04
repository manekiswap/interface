import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Flex } from 'theme-ui';

import Link from '../../../components/links/link';
import routes from '../../routes';
import ChartOverviewPage from '../chart-overview';
import ChartPoolPage from '../chart-pool';
import ChartTokenPage from '../chart-token';

export default function ChartPage() {
  const { t } = useTranslation(['app']);
  const { pathname } = useLocation();

  return (
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
          <Redirect to={{ pathname: routes['chart-overview'] }} />
        </Switch>
      </Flex>
    </Flex>
  );
}
