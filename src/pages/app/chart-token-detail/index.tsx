import { Flex, Heading, IconButton, Link as ExternalLink } from '@theme-ui/components';
import { useCallback } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import TokenLiquidityBlock from '../../../components/blocks/token-liquidity.block';
import TokenPriceBlock from '../../../components/blocks/token-price.block';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import FavoriteButton from '../../../components/buttons/favorite-button';
import Link from '../../../components/links/link';
import TokenLogo from '../../../components/logos/token.logo';
import { mediaWidthTemplates } from '../../../constants/media';
import graphs from '../../../graph';
import { useToken } from '../../../graph/hooks/useToken';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import routes, { buildPoolRoute, buildSwapRoute } from '../../../routes';
import getAddress from '../../../utils/getAddress';
import { ExplorerDataType, getExplorerLink } from '../../../utils/getExplorerLink';

export default function ChartTokenDetailPage() {
  const { chainId } = useActiveWeb3React();
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');

  const { address } = useParams<{ address: string }>();
  const data = graphs.hooks.token.useTokenData([address]);
  const tokenData = data.length > 0 ? data[0] : undefined;

  const dispatch = graphs.useDispatch();
  const watchedData = graphs.hooks.user.useWatchedData();

  const watch = useCallback(() => {
    if (!chainId) return;
    dispatch(graphs.actions.user.updateWatchedToken({ tokenAddress: address, chainId }));
  }, [address, chainId, dispatch]);

  const token = useToken(chainId, tokenData ? { ...tokenData, address } : undefined);
  if (!token || !tokenData) return null;

  return (
    <Flex sx={{ flexDirection: 'column', width: '100%' }}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Breadcrumb
          parentRoute={{ name: 'Tokens', path: routes['chart-tokens'] }}
          currentRoute={{ name: `${tokenData.symbol}` }}
        />
        {isUpToExtraSmall && (
          <Flex sx={{ alignItems: 'center' }}>
            <FavoriteButton sx={{ marginRight: 20 }} active={!!watchedData.tokens[address]} onClick={watch} />
            <IconButton
              as={ExternalLink}
              variant="buttons.small-icon"
              sx={{ color: 'white.400' }}
              {...{ target: '_blank', href: getExplorerLink(chainId ?? -1, address, ExplorerDataType.ADDRESS) }}
            >
              <FiExternalLink />
            </IconButton>
          </Flex>
        )}
      </Flex>
      <Flex
        sx={{
          alignItems: 'center',
          marginY: 44,
          ...mediaWidthTemplates.upToSmall({
            marginTop: 32,
            marginBottom: 24,
          }),
        }}
      >
        <Flex sx={{ alignItems: 'center', marginRight: 20 }}>
          <TokenLogo currency={token} />
        </Flex>
        <Heading as="h5" variant="styles.h5" sx={{ marginRight: 12 }}>
          {`${tokenData.name} (${tokenData.symbol})`}
        </Heading>

        {!isUpToExtraSmall && (
          <>
            <FavoriteButton sx={{ marginRight: 20 }} active={!!watchedData.tokens[address]} onClick={watch} />
            <IconButton
              as={ExternalLink}
              variant="buttons.small-icon"
              sx={{ color: 'white.400' }}
              {...{ target: '_blank', href: getExplorerLink(chainId ?? -1, address, ExplorerDataType.ADDRESS) }}
            >
              <FiExternalLink />
            </IconButton>
          </>
        )}

        {!isUpToExtraSmall && (
          <Flex sx={{ marginLeft: 'auto' }}>
            <Link
              variant="buttons.small-secondary"
              sx={{ textDecoration: 'none', marginRight: 12, minWidth: 108 }}
              to={buildPoolRoute({ address0: getAddress(token) }, routes['pool-add'])}
            >
              Add liquidity
            </Link>
            <Link
              variant="buttons.small-primary"
              sx={{ textDecoration: 'none', minWidth: 108 }}
              to={buildSwapRoute({ from: getAddress(token) })}
            >
              Swap
            </Link>
          </Flex>
        )}
      </Flex>

      <Flex sx={{ flexDirection: 'row', ...mediaWidthTemplates.upToSmall({ flexDirection: 'column' }) }}>
        <TokenPriceBlock
          sx={{
            height: 144,
            width: '25%',
            minWidth: 360,
            backgroundColor: 'dark.500',
            borderRadius: 'lg',
            flexDirection: 'column',
            ...mediaWidthTemplates.upToSmall({
              minWidth: 'initial',
              width: '100%',
              marginBottom: 24,
            }),
          }}
          priceUSD={tokenData.priceUSD}
          priceUSDChange={tokenData.priceChangeUSD}
        />

        {isUpToExtraSmall && (
          <Flex sx={{ marginBottom: 24 }}>
            <Link
              variant="buttons.secondary"
              sx={{ textDecoration: 'none', marginRight: 12, minWidth: 108, flex: 1 }}
              to={buildPoolRoute({ address0: getAddress(token) }, routes['pool-add'])}
            >
              Add liquidity
            </Link>
            <Link
              variant="buttons.primary"
              sx={{ textDecoration: 'none', minWidth: 108, flex: 1 }}
              to={buildSwapRoute({ from: getAddress(token) })}
            >
              Swap
            </Link>
          </Flex>
        )}

        <TokenLiquidityBlock
          sx={{
            flex: 1,
            height: 144,
            marginLeft: 24,
            backgroundColor: 'dark.500',
            borderRadius: 'lg',
            ...mediaWidthTemplates.upToSmall({
              marginLeft: 0,
              width: '100%',
            }),
          }}
          liquidityUSD={tokenData.totalLiquidityUSD}
          liquidityUSDChange={tokenData.liquidityChangeUSD}
          volumeUSD={tokenData.oneDayVolumeUSD}
          volumeUSDChange={tokenData.volumeChangeUSD}
        />
      </Flex>
    </Flex>
  );
}
