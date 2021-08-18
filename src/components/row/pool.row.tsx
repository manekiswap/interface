import { Percent } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import JSBI from 'jsbi';
import { Flex, FlexProps, Text } from 'theme-ui';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useTokenBalance } from '../../hooks/useTokenBalances';
import { useTotalSupply } from '../../hooks/useTotalSupply';
import { formatAmount } from '../../utils/numbers';
import TokenLogo from '../logos/token.logo';

interface Props extends Omit<FlexProps, 'sx'> {
  pair: Pair;
}

export default function PoolRow(props: Props) {
  const { className, pair } = props;
  const { account } = useActiveWeb3React();

  const userPoolBalance = useTokenBalance(pair.liquidityToken, account ?? undefined);
  const totalPoolTokens = useTotalSupply(pair.liquidityToken);

  const poolTokenPercentage =
    !!userPoolBalance &&
    !!totalPoolTokens &&
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient)
      : undefined;

  return (
    <Flex
      className={className}
      sx={{
        height: 60,
        paddingX: 16,
        backgroundColor: 'dark.500',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 'lg',
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <TokenLogo token={pair.token0} />
        <TokenLogo token={pair.token1} sx={{ marginLeft: '-8px' }} />
        <Text sx={{ marginLeft: 12, fontWeight: 'bold' }}>{`${pair.token0.symbol}/${pair.token1.symbol}`}</Text>

        <Flex
          sx={{
            height: 28,
            paddingX: '8px',
            marginLeft: 16,
            borderRadius: 'lg',
            backgroundColor: 'green.200',
            alignItems: 'center',
          }}
        >
          <Text sx={{ color: 'dark.400', fontSize: 0, fontWeight: 'medium' }}>
            {poolTokenPercentage ? poolTokenPercentage.toFixed(6) + '%' : '-'}
          </Text>
          <Text sx={{ color: 'dark.300', marginLeft: '4px', fontSize: 0, fontWeight: 'medium' }}>pool share</Text>
        </Flex>
      </Flex>
      <Flex>
        <Flex sx={{ marginRight: '8px' }}>
          <Text sx={{ color: 'dark.200', marginRight: '4px' }}>{`Pooled ${pair.token0.symbol}:`}</Text>
          <Text>{formatAmount(parseFloat(pair.reserve0.toExact()))}</Text>
        </Flex>
        <Flex>
          <Text sx={{ color: 'dark.200', marginRight: '4px' }}>{`Pooled ${pair.token1.symbol}`}</Text>
          <Text>{formatAmount(parseFloat(pair.reserve1.toExact()))}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
