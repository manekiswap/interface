import { Button, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { animateScroll, scroller } from 'react-scroll';

import LogoImg from '../../assets/images/logo.png';
import { colors } from '../../themes/colors';
import { routes } from '../routes';

const HeaderButton = styled(Button)`
  border-radius: 0px;
  background: none;
  font-weight: 500;
  font-size: 16px;
`;

const hashLinkElement: Record<string, string> = {
  '#about': 'aboutAnchor',
  '#roadmap': 'roadmapAnchor',
  '#distribution': 'distributionAnchor',
  '#contact': 'contactAnchor',
};

export default function Header(props: { paddingX: string }) {
  const { paddingX } = props;
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
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
      height="80px"
      alignItems="center"
      paddingX={paddingX}
      justifyContent="space-between"
      backgroundColor={colors.background._01}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      <Image src={LogoImg} height="48px" width="160px" />
      {isLargerThan1024 && (
        <Flex>
          <HeaderButton
            as={Link}
            to={`${routes.landing}#about`}
            onClick={() => {
              bouncingScroll(hashLinkElement['#about']);
            }}
          >
            {t('how_it_works')}
          </HeaderButton>
          <HeaderButton
            as={Link}
            to={`${routes.landing}#roadmap`}
            onClick={() => {
              bouncingScroll(hashLinkElement['#roadmap']);
            }}
          >
            {t('roadmap')}
          </HeaderButton>
          <HeaderButton
            as={Link}
            to={`${routes.landing}#distribution`}
            onClick={() => {
              bouncingScroll(hashLinkElement['#distribution']);
            }}
          >
            {t('token_distribution')}
          </HeaderButton>
          <HeaderButton
            as={Link}
            to={`${routes.landing}#contact`}
            onClick={() => {
              bouncingScroll(hashLinkElement['#contact']);
            }}
          >
            {t('contact')}
          </HeaderButton>
        </Flex>
      )}
    </Flex>
  );
}
