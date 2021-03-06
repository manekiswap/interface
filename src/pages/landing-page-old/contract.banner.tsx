import { useTranslation } from 'react-i18next';
import { Flex, Link, Text } from 'theme-ui';

import { useMediaQueryMaxWidth } from '../../hooks/useMediaQuery';

export default function ContractBanner(props: { paddingX: number }) {
  const { paddingX } = props;
  const isUpToMedium = useMediaQueryMaxWidth('upToMedium');
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
        backgroundColor: '#1B1B1B',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {!isUpToMedium ? (
        <>
          <Text sx={{ color: '#C2C2C2' }}>{`${t('landing:contract')}: ${manekiTokenAddress}`}</Text>
          <Link
            variant="buttons.small-link"
            sx={{ color: '#FFDA00', textDecoration: 'none' }}
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
          sx={{ color: '#FFDA00', textDecoration: 'none' }}
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
