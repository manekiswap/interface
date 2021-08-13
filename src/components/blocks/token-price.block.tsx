import { Flex, FlexProps, Heading, Text } from 'theme-ui';

import { formatDollarAmount } from '../../utils/numbers';
import Percentage from '../percentage/percentage';

interface Props extends Omit<FlexProps, 'sx'> {
  priceUSD: number;
  priceUSDChange: number;
}

export default function TokenPriceBlock(props: Props) {
  const { className, priceUSD, priceUSDChange } = props;
  return (
    <Flex className={className} sx={{ paddingX: 16, paddingTop: 16, paddingBottom: 24 }}>
      <Flex sx={{ flex: 1, flexDirection: 'column' }}>
        <Text sx={{ fontWeight: 'bold', color: 'white.200', marginBottom: 16 }}>TVL</Text>
        <Heading as="h6" variant="styles.h6" sx={{ marginBottom: 'auto' }}>
          {formatDollarAmount(priceUSD)}
        </Heading>
        <Percentage value={priceUSDChange} />
      </Flex>
    </Flex>
  );
}
