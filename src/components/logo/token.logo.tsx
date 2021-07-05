import { Image } from 'theme-ui';

import EtheriumLogo from '../../assets/images/tokens/ethereum-logo.png';
import { validateAddress } from '../../utils/validateAddress';

export const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/manekiswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

interface Props {
  address: string;
}

export default function TokenLogo(props: Props) {
  const { address } = props;
  const isToken = validateAddress(address);

  if (isToken) {
    return <Image src={getTokenLogoURL(address)} sx={{ height: 24, width: 24 }} />;
  }
  return <Image src={EtheriumLogo} sx={{ height: 24, width: 24 }} />;
}
