import { Flex, Heading, Image, Text } from '@theme-ui/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import LandingBackgroundImg from '../../assets/images/landing/landing-background.png';
import ManekiImg from '../../assets/images/landing/maneki.png';
import Link from '../../components/links/link';
import { mediaWidthTemplates } from '../../constants/media';
import { useMediaQueryMaxWidth } from '../../hooks/useMediaQuery';
import routes from '../../routes';
import { wrapAsset } from '../../utils/renders';
import { capitalizeFirstLetter } from '../../utils/strings';
import ContractBanner from './contract.banner';

export default function About(props: { paddingX: number }) {
  const { paddingX } = props;
  const isUpToMedium = useMediaQueryMaxWidth('upToMedium');
  const { t } = useTranslation(['landing']);

  const renderTitle = useCallback(() => {
    const text = t('landing:introduction');
    const values = text.split(' ');
    const first = values.splice(0, 1);
    const last = values.splice(values.length - 1, 1);

    return (
      <>
        <span>{capitalizeFirstLetter(first[0])}</span>
        {` `}
        <span sx={{ color: '#FFDA00' }}>{values.map((value) => capitalizeFirstLetter(value)).join(' ')}</span>
        {` `}
        <span>{capitalizeFirstLetter(last[0])}</span>
      </>
    );
  }, [t]);

  return (
    <>
      <Flex
        {...{ name: 'aboutAnchor' }}
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
            flexDirection: 'row',
            paddingX: paddingX,
            ...mediaWidthTemplates.upToMedium({
              flexDirection: 'column',
            }),
          }}
        >
          <Flex
            sx={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              verticalAlign: 'top',
              textAlign: 'left',
              ...mediaWidthTemplates.upToMedium({
                display: 'flex',
                alignSelf: 'center',
              }),
            }}
          >
            <Flex
              sx={{
                marginTop: 72,
                maxWidth: 480,
                flexDirection: 'column',
                ...mediaWidthTemplates.upToMedium({
                  maxWidth: '100%',
                }),
              }}
            >
              <Heading
                as="h1"
                variant={!isUpToMedium ? 'styles.h1' : 'styles.h3'}
                sx={{ color: '#FFFFFF', lineHeight: 'initial' }}
              >
                {renderTitle()}
              </Heading>
              <Text
                sx={{
                  marginTop: 24,
                  color: '#5C5C5C',
                  fontSize: !isUpToMedium ? '1.25rem' : '1rem',
                  fontWeight: 'bold',
                }}
              >
                {t('landing:introduction_description')}
              </Text>
              {isUpToMedium && (
                <Link
                  variant="buttons.primary"
                  sx={{
                    marginTop: 24,
                    height: 40,
                    paddingX: 16,
                    fontSize: 0,
                    textDecoration: 'none',
                    borderRadius: 'base',
                  }}
                  to={routes.app}
                >
                  {t('landing:app')}
                </Link>
              )}
            </Flex>
          </Flex>
          <Flex sx={{ flex: 1, justifyContent: 'center' }}>
            <Image
              src={ManekiImg}
              sx={{
                marginTop: 32,
                maxHeight: 680,
                width: 'auto',
                ...mediaWidthTemplates.upToMedium({
                  maxHeight: 472,
                }),
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
