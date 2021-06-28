import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { Button, Divider, Flex, Image } from 'theme-ui';

import LogoImg from '../../assets/images/logo120x36.png';
import Link from '../../components/links/link';
import routes from '../routes';

export default function Header() {
  const { t } = useTranslation(['app']);
  const { pathname } = useLocation();

  return (
    <>
      <Flex
        sx={{
          height: 80,
          width: '100%',
          backgroundColor: 'dark.400',
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
              color: pathname === routes.swap ? 'yellow.300' : 'dark.300',
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
              color: pathname === routes.pool ? 'yellow.300' : 'dark.300',
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
              color: pathname === routes.vote ? 'yellow.300' : 'dark.300',
            }}
            to={routes.vote}
          >
            {t('app:vote')}
          </Link>
        </Flex>
        <Button variant="buttons.small-primary">Connect to wallet</Button>
      </Flex>
      <Divider />
    </>
  );
}
