import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';
import { useMedia } from 'react-use';
import { Flex, Heading, Image, Text } from 'theme-ui';

import LandingBackgroundImg from '../../assets/images/landing-background.png';
import ManekiImg from '../../assets/images/maneki.png';
import { capitalizeFirstLetter, wrapAsset } from '../../utils';
import ContractBanner from './contract.banner';
import Header from './header';

export default function About(props: { paddingX: string }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const { t } = useTranslation();

  return (
    <>
      <Header paddingX={paddingX} />
      <Element name="aboutAnchor" />
      <Flex
        sx={{
          flexDirection: 'column',
          backgroundImage: wrapAsset(LandingBackgroundImg),
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <ContractBanner paddingX={paddingX} />
        <Flex
          sx={{
            flexDirection: isLargerThan1024 ? 'row' : 'column',
            paddingX: paddingX,
          }}
        >
          <Flex
            sx={{
              display: isLargerThan1024 ? 'inline-block' : 'flex',
              alignSelf: 'flex-start',
              verticalAlign: 'top',
              textAlign: 'left',
            }}
          >
            <Flex
              sx={{
                marginTop: 72,
                maxWidth: 480,
                flexDirection: 'column',
              }}
            >
              <Heading as="h1" variant={isLargerThan1024 ? 'styles.h1' : 'styles.h3'} sx={{ color: 'white.400' }}>
                <span>{capitalizeFirstLetter(t('decentralized'))}</span>
                {` `}
                <span sx={{ color: 'yellow.300' }}>{capitalizeFirstLetter(t('trading'))}</span>
                {` `}
                <span>{capitalizeFirstLetter(t('protocol'))}</span>
              </Heading>
              <Text
                sx={{
                  marginTop: 24,
                  color: 'dark.300',
                  fontSize: isLargerThan1024 ? '1.25rem' : '1rem',
                  fontWeight: 'bold',
                }}
              >
                {t('introduction_description')}
              </Text>
            </Flex>
          </Flex>
          <Flex sx={{ flex: 1, justifyContent: 'center' }}>
            <Image
              src={ManekiImg}
              sx={{
                marginTop: 32,
                maxHeight: isLargerThan1024 ? 680 : 472,
                width: 'auto',
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
