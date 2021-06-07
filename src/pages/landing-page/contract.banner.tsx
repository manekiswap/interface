import { Button, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { colors } from '../../themes/colors';

export default function ContractBanner() {
  const manekiTokenAddress = '0x';
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();

  return (
    <Flex
      height="60px"
      paddingX={isLargerThan1024 ? '204px' : '24px'}
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
            to={{ pathname: `https://etherscan.io/token/${manekiTokenAddress}` }}
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
          to={{ pathname: `https://etherscan.io/token/${manekiTokenAddress}` }}
        >
          {t('see_contract_at_etherscan')}
        </Button>
      )}
    </Flex>
  );
}
