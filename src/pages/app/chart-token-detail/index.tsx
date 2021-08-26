import { FiExternalLink, FiStar } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Flex, Heading, IconButton, Link as ExternalLink } from 'theme-ui';

import TokenPriceBlock from '../../../components/blocks/token-price.block';
import TokenTVLBlock from '../../../components/blocks/token-tvl.block';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from '../../../components/links/link';
import TokenLogo from '../../../components/logos/token.logo';
import { useTokenData } from '../../../graph/hooks/token';
import { useToken } from '../../../graph/hooks/useToken';
import useActiveChainId from '../../../hooks/useActiveChainId';
import routes, { buildPoolRoute, buildSwapRoute } from '../../../routes';
import getAddress from '../../../utils/getAddress';
import { ExplorerDataType, getExplorerLink } from '../../../utils/getExplorerLink';

export default function ChartTokenDetailPage() {
  const chainId = useActiveChainId();
  const { address } = useParams<{ address: string }>();
  const tokenData = useTokenData(address);

  const token = useToken(chainId, tokenData);

  if (!tokenData || !token) return null;

  return (
    <Flex sx={{ flexDirection: 'column', width: '100%' }}>
      <Breadcrumb
        parentRoute={{ name: 'Tokens', path: routes['chart-tokens'] }}
        currentRoute={{ name: `${tokenData.symbol}` }}
      />
      <Flex sx={{ alignItems: 'center', marginY: 44 }}>
        <Flex sx={{ alignItems: 'center', marginRight: 20 }}>
          <TokenLogo token={token} />
        </Flex>
        <Heading as="h5" variant="styles.h5" sx={{ marginRight: 12 }}>
          {`${tokenData.name} (${tokenData.symbol})`}
        </Heading>

        <IconButton variant="buttons.small-icon">
          <FiStar sx={{ color: 'white.400' }} size={20} />
        </IconButton>
        <IconButton
          as={ExternalLink}
          variant="buttons.small-icon"
          {...{ target: '_blank', href: getExplorerLink(chainId ?? -1, tokenData.address, ExplorerDataType.ADDRESS) }}
        >
          <FiExternalLink sx={{ color: 'white.400' }} size={20} />
        </IconButton>
        <Flex sx={{ marginLeft: 'auto' }}>
          <Link
            variant="buttons.small-secondary"
            sx={{ textDecoration: 'none', marginRight: 12, minWidth: 108 }}
            to={buildPoolRoute({ address0: getAddress(tokenData) }, routes['pool-add'])}
          >
            Add liquidity
          </Link>
          <Link
            variant="buttons.small-primary"
            sx={{ textDecoration: 'none', minWidth: 108 }}
            to={buildSwapRoute({ from: getAddress(tokenData) })}
          >
            Swap
          </Link>
        </Flex>
      </Flex>

      <Flex sx={{}}>
        <TokenPriceBlock
          sx={{
            height: 144,
            width: '25%',
            minWidth: 360,
            backgroundColor: 'dark.500',
            borderRadius: 'lg',
            flexDirection: 'column',
          }}
          priceUSD={tokenData.priceUSD}
          priceUSDChange={tokenData.priceUSDChange}
        />

        <TokenTVLBlock
          sx={{
            flex: 1,
            height: 144,
            marginLeft: 24,
            backgroundColor: 'dark.500',
            borderRadius: 'lg',
          }}
          tvlUSD={tokenData.tvlUSD}
          tvlUSDChange={tokenData.tvlUSDChange}
          feesUSD={tokenData.feesUSD}
          volumeUSD={tokenData.volumeUSD}
          volumeUSDChange={tokenData.volumeUSDChange}
          volumeUSDWeek={tokenData.volumeUSDWeek}
        />
      </Flex>
    </Flex>
  );
}
