import { useParams } from 'react-router-dom';
import { Flex, Heading } from 'theme-ui';

import { useGraphState } from '../../../graph/context';
import { usePoolChartData, usePoolDatas, usePoolTransactions } from '../../../graph/hooks/pool';
import useActiveChainId from '../../../hooks/useActiveChainId';

export default function PoolDetailPage() {
  const chainId = useActiveChainId();
  const { address } = useParams<{ address: string }>();
  const poolData = usePoolDatas([address])[0];
  const chartData = usePoolChartData(address);
  const transactions = usePoolTransactions(address);
  const a = useGraphState();

  console.log(poolData, chartData, transactions, a);

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Heading as="h2" variant="styles.h2">
        USDC/ETHER
      </Heading>
    </Flex>
  );
}
