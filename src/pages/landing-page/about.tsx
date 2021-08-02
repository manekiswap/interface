import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';
import { Flex, Heading, Image, Text } from 'theme-ui';

import LandingBackgroundImg from '../../assets/images/landing/landing-background.png';
import ManekiImg from '../../assets/images/landing/maneki.png';
import useIsWindowWider from '../../hooks/useIsWindowWider';
import { wrapAsset } from '../../utils/renders';
import { capitalizeFirstLetter } from '../../utils/strings';
import ContractBanner from './contract.banner';
import Header from './header';

export default function About(props: { paddingX: string }) {
  const { paddingX } = props;
  const isWiderThan1024 = useIsWindowWider(1024);
  const { t } = useTranslation(['landing']);

  return (
    <>
      <Header paddingX={paddingX} />
      <Element name="aboutAnchor" />
      <Flex
        sx={{
          paddingTop: 80,
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
            flexDirection: isWiderThan1024 ? 'row' : 'column',
            paddingX: paddingX,
          }}
        >
          <Flex
            sx={{
              display: isWiderThan1024 ? 'inline-block' : 'flex',
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
              <Heading as="h1" variant={isWiderThan1024 ? 'styles.h1' : 'styles.h3'} sx={{ color: 'white.400' }}>
                <span>{capitalizeFirstLetter(t('landing:decentralized'))}</span>
                {` `}
                <span sx={{ color: 'primary' }}>{capitalizeFirstLetter(t('landing:trading'))}</span>
                {` `}
                <span>{capitalizeFirstLetter(t('landing:protocol'))}</span>
              </Heading>
              <Text
                sx={{
                  marginTop: 24,
                  color: 'secondary',
                  fontSize: isWiderThan1024 ? '1.25rem' : '1rem',
                  fontWeight: 'bold',
                }}
              >
                {t('landing:introduction_description')}
              </Text>
            </Flex>
          </Flex>
          <Flex sx={{ flex: 1, justifyContent: 'center' }}>
            <Image
              src={ManekiImg}
              sx={{
                marginTop: 32,
                maxHeight: isWiderThan1024 ? 680 : 472,
                width: 'auto',
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
