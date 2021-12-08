import { Currency, SupportedChainId } from '@manekiswap/sdk';

import EthereumLogo from '../../assets/images/tokens/ethereum-logo.png';
import MaticLogo from '../../assets/images/tokens/matic-logo.png';
import useDefaultLogoURI from '../../hooks/useDefaultLogoURIs';
import { parseAddress } from '../../utils/addresses';
import uriToHttp from '../../utils/uriToHttp';
import Logo, { Props as LogoProps } from './logo';

export const getTokenLogoUrl = (address: string) =>
  `https://raw.githubusercontent.com/manekiswap/assets/master/blockchains/polygon/assets/${address}/logo.png`;

interface Props extends Pick<LogoProps, 'className'> {
  currency: Currency;
}

export default function TokenLogo(props: Props) {
  const { className, currency } = props;
  const defaultLogoURIs = useDefaultLogoURI(currency);

  if (currency.isToken) {
    const parsedAddress = parseAddress(currency.address);
    const srcs = defaultLogoURIs.map(uriToHttp).flat();
    parsedAddress && srcs.push(getTokenLogoUrl(parsedAddress));
    return (
      <Logo
        className={className}
        srcs={srcs}
        sx={{ height: 24, width: 24, borderRadius: 'circle', minHeight: 24, minWidth: 24 }}
      />
    );
  }

  return (
    <Logo
      className={className}
      srcs={[currency.chainId === SupportedChainId.POLYGON ? MaticLogo : EthereumLogo]}
      sx={{ height: 24, width: 24, borderRadius: 'circle', minHeight: 24, minWidth: 24 }}
    />
  );
}
