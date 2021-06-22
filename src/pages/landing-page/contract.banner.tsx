import { Button, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { colors } from '../../themes/colors';

export default function ContractBanner(props: { paddingX: string }) {
  const { paddingX } = props;
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();

  const isDevDomain = location.host === 'dev.manekiswap.com';
  const isProduction = process.env.NODE_ENV === 'production';
  const manekiTokenAddress = !isDevDomain && isProduction ? '' : '0x7DBa9Cb61BAC2c0eD775f688Ac021191AB207dCc';
  const etherScan =
    !isDevDomain && isProduction ? 'https://etherscan.io' : `https://rinkeby.etherscan.io/token/${manekiTokenAddress}`;

  return (
    <Flex
      height="60px"
      paddingX={paddingX}
      backgroundColor={'rgba(27, 27, 27, 0.7)'}
      alignItems="center"
      justifyContent="space-between"
    >
      {isLargerThan1024 ? (
        <>
          <Text color={colors.text._01}>{`${t('contract')}: ${manekiTokenAddress}`}</Text>
          <Button
            colorScheme="black"
            background="none"
            borderRadius="0"
            height="60px"
            color={colors.text._02}
            as={Link}
            target="_blank"
            rel="noreferrer"
            to={{ pathname: etherScan }}
          >
            {t('see_at_etherscan')}
          </Button>
        </>
      ) : (
        <Button
          colorScheme="black"
          background="none"
          borderRadius="0"
          height="60px"
          color={colors.text._02}
          as={Link}
          target="_blank"
          rel="noreferrer"
          to={{ pathname: etherScan }}
        >
          {t('see_contract_at_etherscan')}
        </Button>
      )}
    </Flex>
  );
}
