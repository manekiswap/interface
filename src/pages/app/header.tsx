import { useTranslation } from 'react-i18next';
import { useLocation, useRouteMatch } from 'react-router';
import { Button, Divider, Flex } from 'theme-ui';

import LogoSVG from '../../assets/images/logo.svg';
import LogoCircleSVG from '../../assets/images/logo-circle.svg';
import ConnectWalletButton from '../../components/buttons/connect-wallet.button';
import NavMenuButton from '../../components/buttons/nav-menu.button';
import Link from '../../components/links/link';
import { mediaWidthTemplates } from '../../constants/media';
import { useMediaQueryMaxWidth } from '../../hooks/useMediaQuery';
import routes from '../../routes';

export default function Header() {
  const { t } = useTranslation(['app']);
  const { pathname } = useLocation();
  const matchedPoolRoute = useRouteMatch([routes.pool, routes['pool-add'], routes['pool-remove']]);
  const matchedChartRoute = useRouteMatch([
    routes.chart,
    routes['chart-overview'],
    routes['chart-pools'],
    routes['chart-tokens'],
  ]);

  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
  const isUsingApp = pathname.indexOf(routes.swap) > -1 || pathname.indexOf(routes.pool) > -1;

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
          ...mediaWidthTemplates.upToExtraSmall({
            paddingX: 16,
          }),
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <Link
            variant="buttons.ghost"
            sx={{
              padding: 0,
              '> svg': {
                height: 36,
                width: 120,
              },
              ...mediaWidthTemplates.upToExtraSmall({
                '> svg': {
                  height: 40,
                  width: 40,
                },
              }),
            }}
            to={'/'}
          >
            {isUpToExtraSmall ? <LogoCircleSVG /> : <LogoSVG />}
          </Link>
          {!isUpToExtraSmall && (
            <Flex sx={{ marginLeft: 12 }}>
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
                  color: matchedPoolRoute ? 'primary' : 'secondary',
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
          )}
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
          {isUsingApp && <ConnectWalletButton />}
          <NavMenuButton className="menu-button" sx={{ marginLeft: '8px' }} />
        </Flex>
      </Flex>
      <Divider color="#303033" />
    </Flex>
  );
}
