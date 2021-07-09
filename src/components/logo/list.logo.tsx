import uriToHttp from '../../utils/uriToHttp';
import Logo from './logo';

interface Props {
  logoURI?: string;
}

export default function ListLogo(props: Props) {
  const { logoURI } = props;

  const srcs = !!logoURI ? uriToHttp(logoURI) : [];
  return <Logo srcs={srcs} sx={{ height: 24, width: 24, borderRadius: 'circle' }} />;
}
