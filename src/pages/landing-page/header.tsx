import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { animateScroll, scroller } from 'react-scroll';
import { useMedia } from 'react-use';
import { Button, Flex, Image, Link } from 'theme-ui';

import LogoImg from '../../assets/images/logo.png';
import routes from '../routes';

const HeaderButton = styled(Button)`
  border-radius: 0px;
  background: none;
`;

const hashLinkElement: Record<string, string> = {
  '#about': 'aboutAnchor',
  '#roadmap': 'roadmapAnchor',
  '#distribution': 'distributionAnchor',
  '#contact': 'contactAnchor',
};

export default function Header(props: { paddingX: string }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const { t } = useTranslation();

  const location = useLocation();
  useEffect(() => {
    bouncingScroll(hashLinkElement[location.hash]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bouncingScroll = (elementName: string) => {
    const elements = document.getElementsByName(elementName);
    if (elements.length === 0) return;

    const { y } = elements[0].getBoundingClientRect();
    const currentY = window.pageYOffset;

    if (currentY < y) {
      // scroll down
      animateScroll.scrollTo(currentY - 256, {
        duration: 200,
        delay: 0,
        smooth: 'easeInCubic',
      });
    } else {
      // scroll up
      animateScroll.scrollTo(currentY + 256, {
        duration: 200,
        delay: 0,
        smooth: 'easeInCubic',
      });
    }

    setTimeout(() => {
      scroller.scrollTo(elementName, {
        duration: 600,
        delay: 0,
        smooth: 'easeOutCubic',
      });
    }, 200);
  };

  return (
    <Flex
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        height: 80,
        paddingX,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'dark.400',
      }}
    >
      <Image src={LogoImg} sx={{ height: 48, width: 160 }} />
      {isLargerThan1024 && (
        <Flex>
          <Link
            as={HeaderButton}
            variant="buttons.small-ghost"
            sx={{ color: 'white.400' }}
            href={`${routes.landing}#about`}
            onClick={() => {
              bouncingScroll(hashLinkElement['#about']);
            }}
          >
            {t('how_it_works')}
          </Link>
          <Link
            as={HeaderButton}
            variant="buttons.small-ghost"
            sx={{ color: 'white.400' }}
            href={`${routes.landing}#roadmap`}
            onClick={() => {
              bouncingScroll(hashLinkElement['#roadmap']);
            }}
          >
            {t('roadmap')}
          </Link>
          <Link
            as={HeaderButton}
            variant="buttons.small-ghost"
            sx={{ color: 'white.400' }}
            href={`${routes.landing}#distribution`}
            onClick={() => {
              bouncingScroll(hashLinkElement['#distribution']);
            }}
          >
            {t('token_distribution')}
          </Link>
          <Link
            as={HeaderButton}
            variant="buttons.small-ghost"
            sx={{ color: 'white.400' }}
            href={`${routes.landing}#contact`}
            onClick={() => {
              bouncingScroll(hashLinkElement['#contact']);
            }}
          >
            {t('contact')}
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
