import { Flex, Text } from 'theme-ui';

import { mediaWidthTemplates } from '../../../constants/media';
import TVLOverview from './tvl-overview';
import VolumeOverview from './volume-overview';

const up = '↑';
const down = '↓';

export default function ChartOverviewPage() {
  return (
    <Flex
      sx={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'dark.400',
      }}
    >
      <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: 16 }}>
        <Text sx={{ marginBottom: '8px', textTransform: 'uppercase', color: 'white.300', fontWeight: 'bold' }}>
          Overview
        </Text>
        <Flex
          sx={{
            width: '100%',
            flexDirection: 'row',
            '& > div:first-of-type': { marginRight: 24, marginBottom: 0 },
            ...mediaWidthTemplates.upToExtraSmall({
              flexDirection: 'column',
              '& > div:first-of-type': { marginRight: 0, marginBottom: 24 },
            }),
          }}
        >
          <TVLOverview sx={{ flex: 1 }} />
          <VolumeOverview sx={{ flex: 1 }} />
        </Flex>
        <Flex
          sx={{
            height: 56,
            width: '100%',
            backgroundColor: 'dark.500',
            borderRadius: 'lg',
            alignItems: 'center',
            marginTop: 12,
            paddingX: 16,
          }}
        >
          <Flex>
            <Text sx={{ color: 'white.200' }}>Volume 24H:</Text>
            <Text sx={{ marginX: '4px' }}>$885.15m</Text>
            <Text sx={{ color: 'red.200' }}>{`(${down}29.02%)`}</Text>
          </Flex>
          <Flex sx={{ marginX: 32 }}>
            <Text sx={{ color: 'white.200' }}>Fees 24H:</Text>
            <Text sx={{ marginX: '4px' }}>$1.64m</Text>
            <Text sx={{ color: 'red.200' }}>{`(${down}14.04%)`}</Text>
          </Flex>
          <Flex>
            <Text sx={{ color: 'white.200' }}>TVL:</Text>
            <Text sx={{ marginX: '4px' }}>$1.92B</Text>
            <Text sx={{ color: 'green.200' }}>{`(${up}2.92%)`}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
