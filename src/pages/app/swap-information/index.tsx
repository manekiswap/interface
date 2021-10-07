import { Flex } from '@theme-ui/components';

import { mediaWidthTemplates } from '../../../constants/media';
import ContentView from './content-view';
import MenuView from './menu-view';

export default function SwapInformationPage() {
  return (
    <Flex sx={{ flex: 1, backgroundColor: 'dark.500', flexDirection: 'column', alignItems: 'center' }}>
      <Flex sx={{ maxWidth: 1280, ...mediaWidthTemplates.upToLarge({ maxWidth: 'unset', width: '100%' }) }}>
        <MenuView sx={{ width: 420 }} />
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
