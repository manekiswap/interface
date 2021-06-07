import { Box, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import FeeSVG from '../../assets/images/fee.svg';
import LiquiditySVG from '../../assets/images/liquidity.svg';
import WalletSVG from '../../assets/images/wallet.svg';
import { colors } from '../../themes/colors';

export default function Introduction() {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();

  return (
    <Box id="about" maxWidth="1440px" marginX="auto" textAlign="center" paddingY={isLargerThan1024 ? '120px' : '80px'}>
      <Heading
        as="h2"
        color={colors.text._04}
        fontSize="40px"
        fontWeight="bold"
        marginBottom={isLargerThan1024 ? '72px' : '36px'}
        marginX="24px"
      >
        {t('how_it_works')}
      </Heading>
      <Flex paddingX={isLargerThan1024 ? '204px' : '24px'} flexDirection={isLargerThan1024 ? 'row' : 'column'}>
        <Flex flex={1} flexDirection="column" alignItems="flex-start">
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            textAlign="left"
            maxWidth={isLargerThan1024 ? '288px' : '100%'}
          >
            <LiquiditySVG />
            <Heading
              as="h3"
              color={colors.text._04}
              fontSize="20px"
              marginBottom={'16px'}
              marginTop={isLargerThan1024 ? '40px' : '24px'}
            >
              {t('liquidity')}
            </Heading>
            <Text color={colors.text._03} fontSize="16px">
              {t('liquidity_description')}
            </Text>
          </Flex>
        </Flex>
        <Flex
          flex={1}
          flexDirection="column"
          alignItems="flex-start"
          marginX={isLargerThan1024 ? '24px' : 0}
          marginY={isLargerThan1024 ? 0 : '56px'}
        >
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            textAlign="left"
            maxWidth={isLargerThan1024 ? '288px' : '100%'}
          >
            <FeeSVG />
            <Heading
              as="h3"
              color={colors.text._04}
              fontSize="20px"
              marginBottom={'16px'}
              marginTop={isLargerThan1024 ? '40px' : '24px'}
            >
              {t('fee')}
            </Heading>
            <Text color={colors.text._03} fontSize="16px">
              {t('fee_description')}
            </Text>
          </Flex>
        </Flex>
        <Flex flex={1} flexDirection="column" alignItems="flex-start">
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            textAlign="left"
            maxWidth={isLargerThan1024 ? '288px' : '100%'}
          >
            <WalletSVG />
            <Heading
              as="h3"
              color={colors.text._04}
              fontSize="20px"
              marginBottom={'16px'}
              marginTop={isLargerThan1024 ? '40px' : '24px'}
            >
              {t('decentralized')}
            </Heading>
            <Text color={colors.text._03} fontSize="16px">
              {t('decentralized_description')}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
