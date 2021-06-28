import { useTranslation } from 'react-i18next';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useLocation } from 'react-router';
import { Button, Divider, Flex, Image, useColorMode } from 'theme-ui';

import LogoImg from '../../assets/images/logo120x36.png';
import Link from '../../components/links/link';
import routes from '../routes';

export default function Header() {
  const { t } = useTranslation(['app']);
  const { pathname } = useLocation();
  const [colorMode, setColorMode] = useColorMode();

  return (
    <>
      <Flex
        sx={{
          height: 80,
          width: '100%',
          backgroundColor: 'background',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 18,
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <Image src={LogoImg} sx={{ height: 36, width: 120, marginRight: 36 }} />
          <Link
            variant="buttons.small-ghost"
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
            variant="buttons.small-ghost"
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
            variant="buttons.small-ghost"
            sx={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: pathname === routes.vote ? 'primary' : 'secondary',
            }}
            to={routes.vote}
          >
            {t('app:vote')}
          </Link>
        </Flex>
        <Flex>
          <Button variant="buttons.small-primary">Connect to wallet</Button>
          {/* <Button
            variant="buttons.icon"
            sx={{
              marginLeft: 16,
              height: 48,
              width: 48,
              color: 'text',
              '&>svg': {
                height: 27,
                width: 27,
                path: {
                  fill: 'currentcolor',
                },
              },
            }}
            onClick={(e) => {
              setColorMode(colorMode === 'light' ? 'dark' : 'light');
            }}
          >
            {colorMode === 'light' ? <FiSun /> : <FiMoon />}
          </Button> */}
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}
