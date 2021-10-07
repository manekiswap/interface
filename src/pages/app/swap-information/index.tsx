import { Currency } from '@manekiswap/sdk';
import { Flex } from '@theme-ui/components';
import { useState } from 'react';

import { mediaWidthTemplates } from '../../../constants/media';
import ContentView from './content-view';
import MenuView from './menu-view';

export default function SwapInformationPage() {
  const [pair, setPair] = useState<{ from: Currency | undefined; to: Currency | undefined }>({
    from: undefined,
    to: undefined,
  });

  return (
    <Flex sx={{ flex: 1, backgroundColor: 'dark.500', flexDirection: 'column', alignItems: 'center' }}>
      <Flex sx={{ maxWidth: 1280, ...mediaWidthTemplates.upToLarge({ maxWidth: 'unset', width: '100%' }) }}>
        <MenuView sx={{ width: 420 }} onPickPair={setPair} />
        <ContentView
          sx={{
            width: 860,
            ...mediaWidthTemplates.upToMedium({
              flex: 1,
              width: 'unset',
              marginLeft: 0,
            }),
          }}
          pair={pair}
        />
      </Flex>
    </Flex>
  );
}
