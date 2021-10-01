import { Flex } from '@theme-ui/components';

import ContentView from './content-view';
import MenuView from './menu-view';

export default function SwapV2Page() {
  return (
    <Flex sx={{ flex: 1 }}>
      <MenuView sx={{ width: 420, borderRightColor: '#504E72', borderWidth: '1px' }} />

      <ContentView sx={{ flex: 1, backgroundColor: 'red.200' }} />
    </Flex>
  );
}
