import { useTranslation } from 'react-i18next';
import { useLocation, useRouteMatch } from 'react-router';
import { Divider, Flex } from 'theme-ui';

import LogoSVG from '../../assets/images/logo.svg';
import LogoCircleSVG from '../../assets/images/logo-circle.svg';
import ConnectWalletButton from '../../components/button/connect-wallet.button';
import NavMenuButton from '../../components/button/nav-menu.button';
import Link from '../../components/links/link';
import { mediaWidthTemplates } from '../../constants/media';
import routes from '../routes';

export default function Header() {
  const { t } = useTranslation(['app']);
  const { pathname } = useLocation();
  const matchedChartRoute = useRouteMatch([routes['chart-overview'], routes['chart-pool'], routes['chart-token']]);

  return (
    <Flex as="nav" sx={{ flexDirection: 'column' }}>
      <Flex
        sx={{
          height: 80,
          width: '100%',
          backgroundColor: 'dark.400',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 48,
          '.small-logo': {
            display: 'none',
          },
          ...mediaWidthTemplates.upToExtraSmall({
            paddingX: 16,
            '.small-logo': {
              display: 'flex',
            },
            '.logo': {
              display: 'none',
            },
            '.nav-buttons': {
              a: {
                display: 'none',
              },
            },
          }),
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <LogoCircleSVG className="small-logo" sx={{ height: 40, width: 40 }} />
          <LogoSVG className="logo" sx={{ height: 36, width: 120 }} />
          <Flex className="nav-buttons" sx={{ marginLeft: 36 }}>
            <Link
              variant="buttons.ghost"
              sx={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                color: pathname === routes.swap ? 'primary' : 'secondary',
              }}
              to={routes.swap}
            >
              {t('app:swap')}
            </Link>
            <Link
              variant="buttons.ghost"
              sx={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                color: pathname === routes.pool ? 'primary' : 'secondary',
              }}
              to={routes.pool}
            >
              {t('app:pool')}
            </Link>
            <Link
              variant="buttons.ghost"
              sx={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                color: matchedChartRoute ? 'primary' : 'secondary',
              }}
              to={routes.chart}
            >
              {t('app:chart')}
            </Link>
          </Flex>
        </Flex>
        <Flex
          sx={{
            marginLeft: 'auto',
            '.menu-button': {
              display: 'none',
            },
            ...mediaWidthTemplates.upToExtraSmall({
              '.menu-button': {
                display: 'flex',
              },
            }),
          }}
        >
          {(pathname === routes.pool || pathname === routes.swap) && <ConnectWalletButton />}
          <NavMenuButton className="menu-button" sx={{ marginLeft: '8px' }} />
        </Flex>
      </Flex>
      <Divider color="#303033" />
    </Flex>
  );
}
