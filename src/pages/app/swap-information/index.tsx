import { Currency } from '@manekiswap/sdk';
import { Flex } from '@theme-ui/components';
import { useState } from 'react';

import { mediaWidthTemplates } from '../../../constants/media';
import useTokenInfo from '../../../hooks/grpc/useTokenInfo';
import getAddress from '../../../utils/getAddress';
import ContentView from './content-view';
import MenuView from './menu-view';

export default function SwapInformationPage() {
  const [pair, setPair] = useState<{ from: Currency | undefined; to: Currency | undefined }>({
    from: undefined,
    to: undefined,
  });

  const fromAddress = getAddress(pair.from);
  const fromTokenInfo = useTokenInfo(fromAddress);

  const toAddress = getAddress(pair.to);
  const toTokenInfo = useTokenInfo(toAddress);

  return (
    <Flex sx={{ flex: 1, backgroundColor: 'dark.500' }}>
      <MenuView sx={{ width: '35%', ...mediaWidthTemplates.upToMedium({ width: 'unset' }) }} onPickPair={setPair} />
      <ContentView
        sx={{
          width: '65%',
          ...mediaWidthTemplates.upToMedium({
            flex: 1,
            width: 'unset',
            marginLeft: 0,
          }),
        }}
        pair={pair}
      />
    </Flex>
  );
}
