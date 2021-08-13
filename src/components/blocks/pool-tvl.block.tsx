import { Flex, FlexProps, Heading, Text } from 'theme-ui';

import { formatDollarAmount } from '../../utils/numbers';
import Percentage from '../percentage/percentage';

interface Props extends Omit<FlexProps, 'sx'> {
  tvlUSD: number;
  tvlUSDChange: number;
  volumeUSD: number;
  volumeUSDChange: number;
  feeTier: number;
}

export default function PoolTVLBlock(props: Props) {
  const { className, tvlUSD, tvlUSDChange, volumeUSD, volumeUSDChange, feeTier } = props;
  return (
    <Flex className={className} sx={{ paddingX: 16, paddingTop: 16, paddingBottom: 24 }}>
      <Flex sx={{ flex: 1, flexDirection: 'column' }}>
        <Text sx={{ fontWeight: 'bold', color: 'white.200', marginBottom: 16 }}>TVL</Text>
        <Heading as="h6" variant="styles.h6" sx={{ marginBottom: 'auto' }}>
          {formatDollarAmount(tvlUSD)}
        </Heading>
        <Percentage value={tvlUSDChange} />
      </Flex>

      <Flex sx={{ flex: 1, flexDirection: 'column' }}>
        <Text sx={{ fontWeight: 'bold', color: 'white.200', marginBottom: 16 }}>Volume 24h</Text>
        <Heading as="h6" variant="styles.h6" sx={{ marginBottom: 'auto' }}>
          {formatDollarAmount(volumeUSD)}
        </Heading>
        <Percentage value={volumeUSDChange} />
      </Flex>

      <Flex sx={{ flex: 1, flexDirection: 'column' }}>
        <Text sx={{ fontWeight: 'bold', color: 'white.200', marginBottom: 16 }}>TVL</Text>
        <Heading as="h6" variant="styles.h6">
          {formatDollarAmount(volumeUSD * (feeTier / 1000000))}
        </Heading>
      </Flex>
    </Flex>
  );
}
