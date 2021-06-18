import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';
import { useMedia } from 'react-use';
import { Flex, Heading, Image, Text } from 'theme-ui';

import LandingBackgroundImg from '../../assets/images/landing-background.png';
import ManekiImg from '../../assets/images/maneki.png';
import { capitalizeFirstLetter, wrapAsset } from '../../utils';
import ContractBanner from './contract.banner';
import Header from './header';

export default function About(props: { paddingX: number }) {
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
                maxWidth: 480,
                flexDirection: 'column',
                marginTop: 72,
              }}
            >
              <Heading
                as="h1"
                sx={{
                  fontSize: isLargerThan1024 ? 60 : 40,
                  color: 'white',
                }}
              >
                <span>{capitalizeFirstLetter(t('decentralized'))}</span>
                {` `}
                <span style={{ color: '#FFDA00' }}>{capitalizeFirstLetter(t('trading'))}</span>
                {` `}
                <span>{capitalizeFirstLetter(t('protocol'))}</span>
              </Heading>
              <Text
                sx={{
                  fontSize: isLargerThan1024 ? 20 : 16,
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: 24,
                }}
              >
                {t('introduction_description')}
              </Text>
            </Flex>
          </Flex>
          <Flex
            sx={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Image
              src={ManekiImg}
              sx={{
                maxHeight: isLargerThan1024 ? '680px' : '472px',
                width: 'auto',
                marginTop: 32,
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
