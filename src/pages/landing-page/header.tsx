import { Flex } from '@theme-ui/components';
import { useTranslation } from 'react-i18next';

import LogoSVG from '../../assets/images/logo.svg';
import Link from '../../components/links/link';
import useHashScroll from '../../hooks/useHashScroll';
import useIsWindowWider from '../../hooks/useIsWindowWider';
import { useWindowSize } from '../../hooks/useWindowSize';
import routes from '../../routes';

const hashPaths = {
  ['#about']: { anchor: 'aboutAnchor' },
  ['#roadmap']: { anchor: 'roadmapAnchor' },
  ['#distribution']: { anchor: 'distributionAnchor' },
  ['#contact']: { anchor: 'contactAnchor' },
};

export default function Header(props: { paddingX: string; width?: number }) {
  const { paddingX } = props;
  const isWiderThan1024 = useIsWindowWider(1024);
  const { width = 0 } = useWindowSize();
  const { t } = useTranslation(['landing']);

  const { scroll, toPath } = useHashScroll((hash: string) => hashPaths[hash]);

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
          backgroundColor: '#0E0E0E',
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
                textDecoration: 'none',
                ':focus': { boxShadow: 'none' },
              }}
              to={toPath('#about')}
              onClick={(e) => {
                scroll('#about');
              }}
            >
              {t('landing:products')}
            </Link>
            <Link
              variant="buttons.small-ghost"
              sx={{
                fontSize: 1,
                fontWeight: 'medium',
                textDecoration: 'none',
                ':focus': { boxShadow: 'none' },
              }}
              to={toPath('#roadmap')}
              onClick={(e) => {
                scroll('#roadmap');
              }}
            >
              {t('landing:roadmap')}
            </Link>
            <Link
              variant="buttons.small-ghost"
              sx={{
                fontSize: 1,
                fontWeight: 'medium',
                textDecoration: 'none',
                ':focus': { boxShadow: 'none' },
              }}
              to={toPath('#distribution')}
              onClick={(e) => {
                scroll('#distribution');
              }}
            >
              {t('landing:token_distribution')}
            </Link>
            <Link
              variant="buttons.small-ghost"
              sx={{
                fontSize: 1,
                fontWeight: 'medium',
                textDecoration: 'none',
                ':focus': { boxShadow: 'none' },
              }}
              to={toPath('#contact')}
              onClick={(e) => {
                scroll('#contact');
              }}
            >
              {t('landing:contact')}
            </Link>
            <Link
              variant="buttons.primary"
              sx={{
                height: 40,
                marginLeft: 16,
                paddingX: 16,
                fontSize: 0,
                textDecoration: 'none',
                borderRadius: 'base',
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
