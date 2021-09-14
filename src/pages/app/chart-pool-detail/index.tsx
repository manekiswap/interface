import { FiExternalLink, FiStar } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Flex, Heading, IconButton, Link as ExternalLink, Text } from 'theme-ui';

import PoolLockBlock from '../../../components/blocks/pool-lock.block';
import PoolPriceBlock from '../../../components/blocks/pool-price.block';
import PoolTVLBlock from '../../../components/blocks/pool-tvl.block';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from '../../../components/links/link';
import DualTokenLogo from '../../../components/logos/dual-token.logo';
// import { usePoolDatas } from '../../../graph/hooks/pool';
import { useToken } from '../../../graph/hooks/useToken';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import routes, { buildPoolRoute, buildSwapRoute } from '../../../routes';
import { feeTierPercent } from '../../../utils/fees';
import getAddress from '../../../utils/getAddress';
import { ExplorerDataType, getExplorerLink } from '../../../utils/getExplorerLink';

export default function ChartPoolDetailPage() {
  const { chainId } = useActiveWeb3React();
  const { address } = useParams<{ address: string }>();
  const poolData = {} as any;

  const token0 = useToken(chainId, poolData?.token0);
  const token1 = useToken(chainId, poolData?.token1);

  if (!poolData || !token0 || !token1) return null;

  return (
    <Flex sx={{ flexDirection: 'column', width: '100%' }}>
      <Breadcrumb
        parentRoute={{ name: 'Pools', path: routes['chart-pools'] }}
        currentRoute={{ name: `${poolData.token0.symbol}/${poolData.token1.symbol}` }}
      />
      <Flex sx={{ alignItems: 'center', marginY: 44 }}>
        <Flex sx={{ alignItems: 'center', marginRight: 20 }}>
          <DualTokenLogo currencyA={poolData.token0} currencyB={poolData.token1} />
        </Flex>
        <Heading as="h5" variant="styles.h5" sx={{ marginRight: 12 }}>
          {`${poolData.token0.symbol} / ${poolData.token1.symbol}`}
        </Heading>
        <Flex
          sx={{
            height: 28,
            width: 52,
            marginRight: 16,
            borderRadius: 'lg',
            backgroundColor: 'dark.transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text sx={{ fontSize: 0, fontWeight: 'medium' }}>{feeTierPercent(poolData.feeTier)}</Text>
        </Flex>
        <IconButton variant="buttons.small-icon">
          <FiStar sx={{ color: 'white.400' }} size={20} />
        </IconButton>
        <IconButton
          as={ExternalLink}
          variant="buttons.small-icon"
          {...{ target: '_blank', href: getExplorerLink(chainId ?? -1, poolData.address, ExplorerDataType.ADDRESS) }}
        >
          <FiExternalLink sx={{ color: 'white.400' }} size={20} />
        </IconButton>
        <Flex sx={{ marginLeft: 'auto' }}>
          <Link
            variant="buttons.small-secondary"
            sx={{ textDecoration: 'none', marginRight: 12, minWidth: 108 }}
            to={buildPoolRoute(
              { address0: getAddress(poolData.token0), address1: getAddress(poolData.token1) },
              routes['pool-add'],
            )}
          >
            Add liquidity
          </Link>
          <Link
            variant="buttons.small-primary"
            sx={{ textDecoration: 'none', minWidth: 108 }}
            to={buildSwapRoute({ from: getAddress(poolData.token0), to: getAddress(poolData.token1) })}
          >
            Swap
          </Link>
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
