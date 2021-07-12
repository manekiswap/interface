import { forwardRef } from 'react';

import EtheriumLogo from '../../assets/images/tokens/ethereum-logo.png';
import { isAddress } from '../../utils/addresses';
import uriToHttp from '../../utils/uriToHttp';
import Logo, { Props as LogoProps } from './logo';

export const getTokenLogoUrl = (address: string) =>
  `https://raw.githubusercontent.com/manekiswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

interface Props extends Pick<LogoProps, 'className'> {
  address: string;
  logoURI?: string;
}

const TokenLogo = forwardRef((props: Props) => {
  const { className, address, logoURI } = props;
  const isValid = isAddress(address);

  if (isValid) {
    const srcs = !!logoURI ? uriToHttp(logoURI) : [];
    srcs.push(getTokenLogoUrl(address));
    return <Logo className={className} srcs={srcs} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
  }

  return <Logo className={className} srcs={[EtheriumLogo]} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
});

TokenLogo.displayName = 'TokenLogo';

export default TokenLogo;
