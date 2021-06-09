import { Flex, Heading, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';

import LandingBackgroundImg from '../../assets/images/landing-background.png';
import ManekiImg from '../../assets/images/maneki.png';
import { colors } from '../../themes/colors';
import { capitalizeFirstLetter } from '../../utils';
import ContractBanner from './contract.banner';
import Header from './header';

export default function About(props: { paddingX: string }) {
  const { paddingX } = props;
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();

  return (
    <>
      <Header paddingX={paddingX} />
      <Flex
        as={Element}
        name="aboutAnchor"
        flexDirection="column"
        backgroundImage={LandingBackgroundImg}
        backgroundSize="cover"
        backgroundPosition="top"
        backgroundRepeat="no-repeat"
      >
        <ContractBanner paddingX={paddingX} />
        <Flex flexDirection={isLargerThan1024 ? 'row' : 'column'} paddingX={paddingX}>
          <Flex
            display={isLargerThan1024 ? 'inline-block' : 'flex'}
            alignSelf="flex-start"
            verticalAlign="top"
            textAlign="left"
          >
            <Flex marginTop="72px" maxWidth="480px" flexDirection="column">
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
          </Flex>
          <Flex justifyContent="center">
            <Image src={ManekiImg} marginTop="32px" maxHeight={isLargerThan1024 ? '680px' : '472px'} width={'auto'} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
