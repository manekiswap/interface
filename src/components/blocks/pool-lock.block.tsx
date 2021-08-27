import { Token } from '@manekiswap/sdk';
import { Flex, FlexProps, Text } from 'theme-ui';

import { formatAmount } from '../../utils/numbers';
import TokenLogo from '../logos/token.logo';

interface Props extends Omit<FlexProps, 'sx'> {
  token0: Token;
  token1: Token;
  tvlToken0: number;
  tvlToken1: number;
}

export default function PoolLockBlock(props: Props) {
  const { className, token0, token1, tvlToken0, tvlToken1 } = props;
  return (
    <Flex className={className} sx={{ paddingX: 16, paddingTop: 16, paddingBottom: 24 }}>
      <Text sx={{ fontWeight: 'bold', color: 'white.200', marginBottom: 'auto' }}>Total Tokens Locked</Text>
      <Flex sx={{ alignItems: 'center', marginBottom: 16 }}>
        <TokenLogo token={token0} sx={{ marginRight: 12 }} />
        <Flex sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Text sx={{ color: 'white.300' }}>{token0.symbol}</Text>
          <Text sx={{ color: 'white.300' }}>{formatAmount(tvlToken0)}</Text>
        </Flex>
      </Flex>
      <Flex sx={{ alignItems: 'center' }}>
        <TokenLogo token={token1} sx={{ marginRight: 12 }} />
        <Flex sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Text sx={{ color: 'white.300' }}>{token1.symbol}</Text>
          <Text sx={{ color: 'white.300' }}>{formatAmount(tvlToken1)}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
