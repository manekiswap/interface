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
      }}
    >
      <Flex sx={{ alignSelf: 'flex-start', height: 36, width: 220, backgroundColor: 'dark.500', borderRadius: 'lg' }}>
        <Link
          variant="buttons.ghost"
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            color: pathname === routes.pool ? 'primary' : 'secondary',
          }}
          to={routes.chart}
        >
          {t('app:chart-overview')}
        </Link>
        <Link
          variant="buttons.ghost"
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            color: pathname === routes.pool ? 'primary' : 'secondary',
          }}
          to={routes['chart-pool']}
        >
          {t('app:chart-pool')}
        </Link>
        <Link
          variant="buttons.ghost"
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            color: pathname === routes.pool ? 'primary' : 'secondary',
          }}
          to={routes['chart-token']}
        >
          {t('app:chart-token')}
        </Link>
      </Flex>
      <Switch>
        <Route exact path={routes['chart-overview']} component={ChartOverviewPage} />
        <Route exact path={routes['chart-pool']} component={ChartPoolPage} />
        <Route exact path={routes['chart-token']} component={ChartTokenPage} />
        <Redirect to={{ pathname: routes['chart-overview'] }} />
      </Switch>
    </Flex>
  );
}
