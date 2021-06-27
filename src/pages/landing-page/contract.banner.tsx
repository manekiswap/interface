import { useTranslation } from 'react-i18next';
import { useMedia } from 'react-use';
import { Button, Flex, Link, Text } from 'theme-ui';

export default function ContractBanner(props: { paddingX: string }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const { t } = useTranslation();

  const isDevDomain = location.host === 'dev.manekiswap.com';
  const isProduction = process.env.NODE_ENV === 'production';
  const manekiTokenAddress = !isDevDomain && isProduction ? '' : '0x7DBa9Cb61BAC2c0eD775f688Ac021191AB207dCc';
  const etherScan =
    !isDevDomain && isProduction
      ? 'https://etherscan.io'
      : `https://rinkeby.etherscan.io/address/${manekiTokenAddress}`;

  return (
    <Flex
      sx={{
        height: 60,
        paddingX,
        backgroundColor: 'rgba(27, 27, 27, 0.7)',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {isLargerThan1024 ? (
        <>
          <Text sx={{ color: 'dark.200' }}>{`${t('contract')}: ${manekiTokenAddress}`}</Text>
          <Link
            as={Button}
            variant="buttons.small-link"
            sx={{ color: 'yellow.300' }}
            target="_blank"
            rel="noreferrer"
            href={etherScan}
          >
            {t('see_at_etherscan')}
          </Link>
        </>
      ) : (
        <Link
          as={Button}
          variant="buttons.small-link"
          sx={{ color: 'yellow.300' }}
          target="_blank"
          rel="noreferrer"
          href={etherScan}
        >
          {t('see_contract_at_etherscan')}
        </Link>
      )}
    </Flex>
  );
}
