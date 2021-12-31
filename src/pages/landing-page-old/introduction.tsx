import { useTranslation } from 'react-i18next';
import { Flex, Heading, Text } from 'theme-ui';

import FeeSVG from '../../assets/images/landing/fee.svg';
import LiquiditySVG from '../../assets/images/landing/liquidity.svg';
import WalletSVG from '../../assets/images/landing/wallet.svg';
import { mediaWidthTemplates } from '../../constants/media';

export default function Introduction(props: { paddingX: number }) {
  const { paddingX } = props;
  const { t } = useTranslation(['landing']);

  return (
    <Flex
      id="about"
      sx={{
        flexDirection: 'column',
        paddingY: 120,
        ...mediaWidthTemplates.upToMedium({
          paddingY: 80,
        }),
      }}
    >
      <Heading
        as="h3"
        variant="styles.h3"
        sx={{
          textAlign: 'center',
          marginX: 24,
          marginBottom: 72,
          color: '#0E0E0E',
          ...mediaWidthTemplates.upToMedium({
            marginBottom: 36,
          }),
        }}
      >
        {t('landing:products')}
      </Heading>
      <Flex
        sx={{
          flexDirection: 'row',
          paddingX,
          ...mediaWidthTemplates.upToMedium({
            flexDirection: 'column',
          }),
        }}
      >
        <Flex sx={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              maxWidth: 288,
              ...mediaWidthTemplates.upToMedium({
                maxWidth: '100%',
              }),
            }}
          >
            <LiquiditySVG />
            <Heading
              variant={'styles.h5'}
              sx={{
                marginBottom: 16,
                marginTop: 40,
                color: '#0E0E0E',
                ...mediaWidthTemplates.upToMedium({
                  marginTop: 24,
                }),
              }}
            >
              {t('landing:feature_1')}
            </Heading>
            <Text sx={{ color: '#5C5C5C' }}>{t('landing:feature_1_description')}</Text>
          </Flex>
        </Flex>
        <Flex
          sx={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginX: 24,
            marginY: 0,
            ...mediaWidthTemplates.upToMedium({
              marginX: 0,
              marginY: 56,
            }),
          }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              maxWidth: 288,
              ...mediaWidthTemplates.upToMedium({
                maxWidth: '100%',
              }),
            }}
          >
            <FeeSVG />
            <Heading
              variant={'styles.h5'}
              sx={{
                marginBottom: 16,
                marginTop: 40,
                color: '#0E0E0E',
                ...mediaWidthTemplates.upToMedium({
                  marginTop: 24,
                }),
              }}
            >
              {t('landing:feature_2')}
            </Heading>
            <Text sx={{ color: '#5C5C5C' }}>{t('landing:feature_2_description')}</Text>
          </Flex>
        </Flex>
        <Flex
          sx={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              maxWidth: 288,
              ...mediaWidthTemplates.upToMedium({
                maxWidth: '100%',
              }),
            }}
          >
            <WalletSVG />
            <Heading
              variant={'styles.h5'}
              sx={{
                marginBottom: 16,
                marginTop: 40,
                color: '#0E0E0E',
                ...mediaWidthTemplates.upToMedium({
                  marginTop: 24,
                }),
              }}
            >
              {t('landing:feature_3')}
            </Heading>
            <Text sx={{ color: '#5C5C5C' }}>{t('landing:feature_3_description')}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
