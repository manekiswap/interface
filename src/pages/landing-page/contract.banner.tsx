import { useTranslation } from 'react-i18next';
import { useMedia } from 'react-use';
import { Flex, Link, Text } from 'theme-ui';

export default function ContractBanner(props: { paddingX: string }) {
  const { paddingX } = props;
  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const { t } = useTranslation(['landing']);

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
        backgroundColor: 'accent',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {isLargerThan1024 ? (
        <>
          <Text sx={{ color: 'label' }}>{`${t('landing:contract')}: ${manekiTokenAddress}`}</Text>
          <Link
            variant="buttons.small-link"
            sx={{ color: 'primary', textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
            href={etherScan}
          >
            {t('landing:see_at_etherscan')}
          </Link>
        </>
      ) : (
        <Link
          variant="buttons.small-link"
          sx={{ color: 'primary', textDecoration: 'none' }}
          target="_blank"
          rel="noreferrer"
          href={etherScan}
        >
          {t('landing:see_contract_at_etherscan')}
        </Link>
      )}
    </Flex>
  );
}
