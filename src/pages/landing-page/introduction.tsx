import { useTranslation } from 'react-i18next';
import { useMedia } from 'react-use';
import { Flex, Heading, Text } from 'theme-ui';

import FeeSVG from '../../assets/images/fee.svg';
import LiquiditySVG from '../../assets/images/liquidity.svg';
import WalletSVG from '../../assets/images/wallet.svg';

export default function Introduction(props: { paddingX: string }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const { t } = useTranslation();

  return (
    <Flex id="about" sx={{ flexDirection: 'column', paddingY: isLargerThan1024 ? 120 : 80 }}>
      <Heading
        as="h3"
        variant="styles.h3"
        sx={{
          textAlign: 'center',
          marginX: 24,
          marginBottom: isLargerThan1024 ? 72 : 36,
        }}
      >
        {t('how_it_works')}
      </Heading>
      <Flex sx={{ flexDirection: isLargerThan1024 ? 'row' : 'column', paddingX }}>
        <Flex sx={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              maxWidth: isLargerThan1024 ? 288 : '100%',
            }}
          >
            <LiquiditySVG />
            <Heading as="h6" variant={'styles.h6'} sx={{ marginBottom: 16, marginTop: isLargerThan1024 ? 40 : 24 }}>
              {t('liquidity')}
            </Heading>
            <Text color={'dark.300'}>{t('liquidity_description')}</Text>
          </Flex>
        </Flex>
        <Flex
          sx={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginX: isLargerThan1024 ? 24 : 0,
            marginY: isLargerThan1024 ? 0 : 56,
          }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              maxWidth: isLargerThan1024 ? 288 : '100%',
            }}
          >
            <FeeSVG />
            <Heading as="h6" variant={'styles.h6'} sx={{ marginBottom: 16, marginTop: isLargerThan1024 ? 40 : 24 }}>
              {t('fee')}
            </Heading>
            <Text color={'dark.300'}>{t('fee_description')}</Text>
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
              maxWidth: isLargerThan1024 ? 288 : '100%',
            }}
          >
            <WalletSVG />
            <Heading as="h6" variant={'styles.h6'} sx={{ marginBottom: 16, marginTop: isLargerThan1024 ? 40 : 24 }}>
              {t('decentralized')}
            </Heading>
            <Text color={'dark.300'}>{t('decentralized_description')}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
