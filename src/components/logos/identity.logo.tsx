import Jazzicon from '@metamask/jazzicon';
import { useEffect, useRef } from 'react';
import { Box, BoxProps } from '@theme-ui/components';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';

export default function IdentityLogo(props: BoxProps) {
  const { className } = props;
  const ref = useRef<HTMLDivElement>(null);

  const { account } = useActiveWeb3React();

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  }, [account]);

  return <Box className={className} ref={ref} sx={{ height: '1rem', width: '1rem', color: 'dark.400' }} />;
}
