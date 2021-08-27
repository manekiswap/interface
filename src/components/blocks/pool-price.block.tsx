import { Token } from '@manekiswap/sdk';
import { Flex, FlexProps, Text } from 'theme-ui';

import { formatAmount } from '../../utils/numbers';
import TokenLogo from '../logos/token.logo';

interface Props extends Omit<FlexProps, 'sx'> {
  token0: Token;
  token1: Token;
  token0Price: number;
  token1Price: number;
}

export default function PoolPriceBlock(props: Props) {
  const { className, token0, token1, token0Price, token1Price } = props;
  return (
    <Flex className={className} sx={{ flexDirection: 'column' }}>
      <Flex
        sx={{
          paddingX: 16,
          marginBottom: 16,
          alignItems: 'center',
          borderRadius: 'lg',
          backgroundColor: 'dark.transparent',
        }}
      >
        <TokenLogo token={token0} sx={{ marginRight: 12 }} />
        <Flex sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Text>{`1 ${token0.symbol} =`}</Text>
          <Text>{`${formatAmount(token1Price)} ${token1.symbol}`}</Text>
        </Flex>
      </Flex>
      <Flex
        sx={{
          paddingX: 16,
          alignItems: 'center',
          borderRadius: 'lg',
          backgroundColor: 'dark.transparent',
        }}
      >
        <TokenLogo token={token1} sx={{ marginRight: 12 }} />
        <Flex sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Text>{`1 ${token1.symbol} =`}</Text>
          <Text>{`${formatAmount(token0Price)} ${token0.symbol}`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
