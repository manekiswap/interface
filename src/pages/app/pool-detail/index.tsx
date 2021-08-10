import { useParams } from 'react-router-dom';
import { Flex, Heading, Text } from 'theme-ui';

import PoolLockBlock from '../../../components/blocks/pool-lock.block';
import PoolPriceBlock from '../../../components/blocks/pool-price.block';
import PoolTVLBlock from '../../../components/blocks/pool-tvl.block';
import TokenLogo from '../../../components/logos/token.logo';
import { usePoolDatas } from '../../../graph/hooks/pool';
import { useToken } from '../../../graph/hooks/useToken';
import useActiveChainId from '../../../hooks/useActiveChainId';
import { feeTierPercent } from '../../../utils/fees';

export default function PoolDetailPage() {
  const chainId = useActiveChainId();
  const { address } = useParams<{ address: string }>();
  const poolData = usePoolDatas([address])[0];

  const token0 = useToken(chainId, poolData?.token0);
  const token1 = useToken(chainId, poolData?.token1);

  if (!poolData || !token0 || !token1) return null;

  return (
    <Flex sx={{ flexDirection: 'column', width: '100%' }}>
      <Flex sx={{ alignItems: 'center', marginY: 44 }}>
        <Flex sx={{ alignItems: 'center', marginRight: 20 }}>
          <TokenLogo token={token0} sx={{ marginRight: '4px' }} />
          <TokenLogo token={token1} />
        </Flex>
        <Heading as="h5" variant="styles.h5" sx={{ marginRight: 12 }}>
          {`${poolData.token0.symbol} / ${poolData.token1.symbol}`}
        </Heading>
        <Flex
          sx={{
            height: 28,
            width: 52,
            borderRadius: 'lg',
            backgroundColor: 'dark.transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text sx={{ fontSize: 0, fontWeight: 'medium' }}>{feeTierPercent(poolData.feeTier)}</Text>
        </Flex>
      </Flex>

      <Flex sx={{}}>
        <PoolPriceBlock
          sx={{
            width: '25%',
            minWidth: 264,
            flexDirection: 'column',
            '& > div': {
              height: 64,
            },
          }}
          token0={token0}
          token1={token1}
          token0Price={poolData.token0Price}
          token1Price={poolData.token1Price}
        />

        <PoolLockBlock
          sx={{
            height: 144,
            width: '25%',
            minWidth: 264,
            marginLeft: 24,
            backgroundColor: 'dark.500',
            borderRadius: 'lg',
            flexDirection: 'column',
          }}
          token0={token0}
          token1={token1}
          tvlToken0={poolData.tvlToken0}
          tvlToken1={poolData.tvlToken1}
        />
        <PoolTVLBlock
          sx={{
            flex: 1,
            height: 144,
            marginLeft: 24,
            backgroundColor: 'dark.500',
            borderRadius: 'lg',
          }}
          tvlUSD={poolData.tvlUSD}
          tvlUSDChange={poolData.tvlUSDChange}
          volumeUSD={poolData.volumeUSD}
          volumeUSDChange={poolData.volumeUSDChange}
          feeTier={poolData.feeTier}
        />
      </Flex>
    </Flex>
  );
}
