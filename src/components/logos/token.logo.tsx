import { Currency } from '@uniswap/sdk-core';
import { forwardRef } from 'react';

import EtheriumLogo from '../../assets/images/tokens/ethereum-logo.png';
import useDefaultLogoURI from '../../hooks/useDefaultLogoURI';
import { parseAddress } from '../../utils/addresses';
import uriToHttp from '../../utils/uriToHttp';
import Logo, { Props as LogoProps } from './logo';

export const getTokenLogoUrl = (address: string) =>
  `https://raw.githubusercontent.com/manekiswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

interface Props extends Pick<LogoProps, 'className'> {
  token: Currency;
}

const TokenLogo = forwardRef((props: Props, ref) => {
  const { className, token } = props;
  const defaultLogoURIs = useDefaultLogoURI(token);

  if (token.isToken) {
    const parsedAddress = parseAddress(token.address);
    const srcs = defaultLogoURIs.map(uriToHttp).flat();
    parsedAddress && srcs.push(getTokenLogoUrl(parsedAddress));
    return <Logo className={className} srcs={srcs} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
  }

  return <Logo className={className} srcs={[EtheriumLogo]} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
});

TokenLogo.displayName = 'TokenLogo';

export default TokenLogo;
