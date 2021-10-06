import { Flex } from '@theme-ui/components';

import { mediaWidthTemplates } from '../../../constants/media';
import ContentView from './content-view';
import MenuView from './menu-view';

export default function SwapInformationPage() {
  return (
    <Flex sx={{ flex: 1, backgroundColor: 'dark.500', flexDirection: 'column', alignItems: 'center' }}>
      <Flex sx={{ maxWidth: 1280 }}>
        <MenuView
          sx={{
            width: 420,
            borderRight: '1px solid #3C3F5A',
            ...mediaWidthTemplates.upToMedium({
              display: 'none',
            }),
          }}
        />
        <ContentView
          sx={{
            width: 860,
            ...mediaWidthTemplates.upToMedium({
              flex: 1,
              width: 'unset',
              marginLeft: 0,
            }),
          }}
        />
      </Flex>
    </Flex>
  );
}
