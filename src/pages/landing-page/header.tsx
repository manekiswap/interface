import { Button, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';

import LogoImg from '../../assets/images/logo.png';
import { colors } from '../../themes/colors';
import { routes } from '../routes';

const HeaderButton = styled(Button)`
  border-radius: 0px;
  background: none;
  font-weight: 500;
  font-size: 16px;
`;

export default function Header() {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();

  return (
    <Flex
      maxWidth="1440px"
      marginX="auto"
      height="80px"
      paddingX={isLargerThan1024 ? '204px' : '24px'}
      alignItems="center"
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
          <HeaderButton as={HashLink} to={`${routes.landing}#about`}>
            {t('how_it_works')}
          </HeaderButton>
          <HeaderButton as={HashLink} to={`${routes.landing}#roadmap`}>
            {t('roadmap')}
          </HeaderButton>
          <HeaderButton as={HashLink} to={`${routes.landing}#distribution`}>
            {t('token_distribution')}
          </HeaderButton>
          <HeaderButton as={HashLink} to={`${routes.landing}#contact`}>
            {t('contact')}
          </HeaderButton>
        </Flex>
      )}
    </Flex>
  );
}
