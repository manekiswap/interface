import { Flex } from '@theme-ui/components';

import ContentView from './content-view';
import MenuView from './menu-view';

export default function SwapV2Page() {
  return (
    <Flex sx={{ flex: 1 }}>
      <MenuView sx={{ width: 420, borderRight: '1px solid #3C3F5A' }} />
      <ContentView sx={{ flex: 1, marginLeft: 420 }} />
    </Flex>
  );
}
