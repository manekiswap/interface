import { Flex } from '@theme-ui/components';
import { useTranslation } from 'react-i18next';

import LogoSVG from '../../assets/images/logo.svg';
import Link from '../../components/links/link';
import useHashScroll from '../../hooks/useHashScroll';
import useIsWindowWider from '../../hooks/useIsWindowWider';
import { useWindowSize } from '../../hooks/useWindowSize';
import routes from '../../routes';

const hashPaths = {
  [`${routes.landing}#about`]: 'aboutAnchor',
  [`${routes.landing}#roadmap`]: 'roadmapAnchor',
  [`${routes.landing}#distribution`]: 'distributionAnchor',
  [`${routes.landing}#contact`]: 'contactAnchor',
};

export default function Header(props: { paddingX: string; width?: number }) {
  const { paddingX } = props;
  const isWiderThan1024 = useIsWindowWider(1024);
  const { width = 0 } = useWindowSize();
  const { t } = useTranslation(['landing']);

  const { scroll } = useHashScroll((path: string) => hashPaths[`${routes.landing}${path}`]);

  return (
    <Flex
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      <Flex
        as="nav"
        sx={{
          height: 80,
          paddingX,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'dark.500',
          maxWidth: 1440,
          width,
        }}
      >
        <LogoSVG sx={{ height: 48, width: 160 }} />
        {isWiderThan1024 && (
          <Flex>
            <Link
              variant="buttons.small-ghost"
              sx={{
                fontSize: 1,
                fontWeight: 'medium',
                color: 'white.400',
                textDecoration: 'none',
              }}
              to={`${routes.landing}#about`}
              onClick={(e) => {
                scroll(hashPaths[`${routes.landing}#about`]);
              }}
            >
              {t('landing:products')}
            </Link>
            <Link
              variant="buttons.small-ghost"
              sx={{
                fontSize: 1,
                fontWeight: 'medium',
                color: 'white.400',
                textDecoration: 'none',
              }}
              to={`${routes.landing}#roadmap`}
              onClick={(e) => {
                scroll(hashPaths[`${routes.landing}#roadmap`]);
              }}
            >
              {t('landing:roadmap')}
            </Link>
            <Link
              variant="buttons.small-ghost"
              sx={{
                fontSize: 1,
                fontWeight: 'medium',
                color: 'white.400',
                textDecoration: 'none',
              }}
              to={`${routes.landing}#distribution`}
              onClick={(e) => {
                scroll(hashPaths[`${routes.landing}#distribution`]);
              }}
            >
              {t('landing:token_distribution')}
            </Link>
            <Link
              variant="buttons.small-ghost"
              sx={{
                fontSize: 1,
                fontWeight: 'medium',
                color: 'white.400',
                textDecoration: 'none',
              }}
              to={`${routes.landing}#contact`}
              onClick={(e) => {
                scroll(hashPaths[`${routes.landing}#contact`]);
              }}
            >
              {t('landing:contact')}
            </Link>
            <Link
              variant="buttons.small-primary"
              sx={{
                marginLeft: 16,
                fontSize: 1,
                textDecoration: 'none',
              }}
              to={routes.app}
            >
              {t('landing:app')}
            </Link>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
