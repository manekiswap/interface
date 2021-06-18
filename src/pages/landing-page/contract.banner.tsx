import { useTranslation } from 'react-i18next';
import { useMedia } from 'react-use';
import { Button, Flex, Link, Text } from 'theme-ui';

export default function ContractBanner(props: { paddingX: number }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const { t } = useTranslation();

  const isDevDomain = location.host === 'dev.manekiswap.com';
  const isProduction = process.env.NODE_ENV === 'production';
  const manekiTokenAddress = !isDevDomain && isProduction ? '' : '0x7DBa9Cb61BAC2c0eD775f688Ac021191AB207dCc';
  const etherScan =
    !isDevDomain && isProduction ? 'https://etherscan.io' : `https://rinkeby.etherscan.io/token/${manekiTokenAddress}`;

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
          <Text sx={{ color: 'grey.2' }}>{`${t('contract')}: ${manekiTokenAddress}`}</Text>
          <Link
            as={Button}
            sx={{
              borderRadius: 0,
              background: 'none',
              height: 60,
              color: 'yellow',
            }}
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
          sx={{
            borderRadius: 0,
            background: 'none',
            height: 60,
            color: 'yellow',
          }}
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
