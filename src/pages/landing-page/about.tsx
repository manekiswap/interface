import { Box, Flex, Heading, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import LandingBackgroundImg from '../../assets/images/landing-background.png';
import ManekiImg from '../../assets/images/maneki.png';
import { colors } from '../../themes/colors';
import { capitalizeFirstLetter } from '../../utils';
import ContractBanner from './contract.banner';
import Header from './header';

export default function About() {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Box
        maxWidth="1440px"
        marginX="auto"
        backgroundImage={LandingBackgroundImg}
        backgroundSize="auto"
        backgroundPosition="top"
        backgroundRepeat="no-repeat"
      >
        <ContractBanner />
        <Box paddingX={isLargerThan1024 ? '204px' : '24px'} textAlign="center">
          <Box
            display={isLargerThan1024 ? 'inline-block' : 'flex'}
            alignSelf="flex-start"
            verticalAlign="top"
            textAlign="left"
          >
            <Flex marginTop="72px" width="480px" flexDirection="column">
              <Heading as="h1" fontSize={isLargerThan1024 ? '60px' : '40px'} fontWeight="bold">
                <span>{capitalizeFirstLetter(t('decentralized'))}</span>
                {` `}
                <span style={{ color: '#FFDA00' }}>{capitalizeFirstLetter(t('trading'))}</span>
                {` `}
                <span>{capitalizeFirstLetter(t('protocol'))}</span>
              </Heading>
              <Text
                marginTop="24px"
                fontSize={isLargerThan1024 ? '20px' : '16px'}
                fontWeight="bold"
                color={colors.text._03}
              >
                {t('introduction_description')}
              </Text>
            </Flex>
          </Box>
          <Image
            display="inline-block"
            src={ManekiImg}
            marginTop="32px"
            maxHeight={isLargerThan1024 ? '680px' : '472px'}
            width={'auto'}
          />
        </Box>
      </Box>
    </>
  );
}
