import { Image } from 'theme-ui';

import EtheriumLogo from '../../assets/images/tokens/ethereum-logo.png';
import uriToHttp from '../../utils/uriToHttp';
import { validateAddress } from '../../utils/validateAddress';
import Logo from './logo';

export const getTokenLogoUrl = (address: string) =>
  `https://raw.githubusercontent.com/manekiswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

interface Props {
  address: string;
  logoURI?: string;
}

export default function TokenLogo(props: Props) {
  const { address, logoURI } = props;
  const isToken = validateAddress(address);

  if (isToken) {
    const srcs = !!logoURI ? uriToHttp(logoURI) : [];
    srcs.push(getTokenLogoUrl(address));
    return <Logo srcs={srcs} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
  }

  return <Logo srcs={[EtheriumLogo]} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
}
