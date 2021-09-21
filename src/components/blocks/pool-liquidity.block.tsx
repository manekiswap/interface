import { Flex, FlexProps, Heading, Text } from 'theme-ui';

import Percentage from '../percentages/percentage';

interface Props extends Omit<FlexProps, 'sx'> {
  liquidity: string;
  liquidityChange: string;
  volume: string;
  volumeChange: string;
  fees: string;
}

export default function PoolLiquidityBlock(props: Props) {
  const { className, liquidity, liquidityChange, volume, volumeChange, fees } = props;
  return (
    <Flex className={className} sx={{ paddingX: 16, paddingTop: 16, paddingBottom: 24 }}>
      <Flex sx={{ flex: 1, flexDirection: 'column' }}>
        <Text sx={{ fontWeight: 'bold', color: 'white.200', marginBottom: 16 }}>TVL</Text>
        <Heading as="h6" variant="styles.h6" sx={{ marginBottom: 'auto' }}>
          {liquidity}
        </Heading>
        <Percentage value={liquidityChange} />
      </Flex>

      <Flex sx={{ flex: 1, flexDirection: 'column' }}>
        <Text sx={{ fontWeight: 'bold', color: 'white.200', marginBottom: 16 }}>Volume 24h</Text>
        <Heading as="h6" variant="styles.h6" sx={{ marginBottom: 'auto' }}>
          {volume}
        </Heading>
        <Percentage value={volumeChange} />
      </Flex>

      <Flex sx={{ flex: 1, flexDirection: 'column' }}>
        <Text sx={{ fontWeight: 'bold', color: 'white.200', marginBottom: 16 }}>Fees</Text>
        <Heading as="h6" variant="styles.h6">
          {fees}
        </Heading>
        <Percentage value={volumeChange} />
      </Flex>
    </Flex>
  );
}
