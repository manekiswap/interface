import { Image } from 'theme-ui';

import EtheriumLogo from '../../assets/images/tokens/ethereum-logo.png';
import { validateAddress } from '../../utils/validateAddress';

export const getTokenLogoUrl = (address: string) =>
  `https://raw.githubusercontent.com/manekiswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

interface Props {
  address: string;
  defaultLogoUrl?: string;
}

export default function TokenLogo(props: Props) {
  const { address, defaultLogoUrl } = props;
  const isToken = validateAddress(address);

  if (!!defaultLogoUrl) {
    return <Image src={defaultLogoUrl} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
  }

  if (isToken) {
    return <Image src={getTokenLogoUrl(address)} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
  }

  return <Image src={EtheriumLogo} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
}
