import { useTranslation } from 'react-i18next';
import { Flex, Heading, Text } from 'theme-ui';

import FeeSVG from '../../assets/images/landing/fee.svg';
import LiquiditySVG from '../../assets/images/landing/liquidity.svg';
import WalletSVG from '../../assets/images/landing/wallet.svg';
import useIsWindowWider from '../../hooks/useIsWindowWider';

export default function Introduction(props: { paddingX: string }) {
  const { paddingX } = props;
  const isWiderThan1024 = useIsWindowWider(1024);
  const { t } = useTranslation(['landing']);

  return (
    <Flex id="about" sx={{ flexDirection: 'column', paddingY: isWiderThan1024 ? 120 : 80 }}>
      <Heading
        as="h3"
        variant="styles.h3"
        sx={{
          textAlign: 'center',
          marginX: 24,
          marginBottom: isWiderThan1024 ? 72 : 36,
          color: 'text',
        }}
      >
        {t('landing:products')}
      </Heading>
      <Flex sx={{ flexDirection: isWiderThan1024 ? 'row' : 'column', paddingX }}>
        <Flex sx={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              maxWidth: isWiderThan1024 ? 288 : '100%',
            }}
          >
            <LiquiditySVG />
            <Heading
              as="h6"
              variant={'styles.h6'}
              sx={{ marginBottom: 16, marginTop: isWiderThan1024 ? 40 : 24, color: 'text' }}
            >
              {t('landing:feature_1')}
            </Heading>
            <Text sx={{ color: 'secondary' }}>{t('landing:feature_1_description')}</Text>
          </Flex>
        </Flex>
        <Flex
          sx={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginX: isWiderThan1024 ? 24 : 0,
            marginY: isWiderThan1024 ? 0 : 56,
          }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              maxWidth: isWiderThan1024 ? 288 : '100%',
            }}
          >
            <FeeSVG />
            <Heading
              as="h6"
              variant={'styles.h6'}
              sx={{ marginBottom: 16, marginTop: isWiderThan1024 ? 40 : 24, color: 'text' }}
            >
              {t('landing:feature_2')}
            </Heading>
            <Text sx={{ color: 'secondary' }}>{t('landing:feature_2_description')}</Text>
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
              maxWidth: isWiderThan1024 ? 288 : '100%',
            }}
          >
            <WalletSVG />
            <Heading
              as="h6"
              variant={'styles.h6'}
              sx={{ marginBottom: 16, marginTop: isWiderThan1024 ? 40 : 24, color: 'text' }}
            >
              {t('landing:feature_3')}
            </Heading>
            <Text sx={{ color: 'secondary' }}>{t('landing:feature_3_description')}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
