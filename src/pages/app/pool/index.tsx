import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import { useCallback, useMemo } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading, Text } from 'theme-ui';

import OpenedWhiteBoxSVG from '../../../assets/images/icons/opened-white-box.svg';
import Link from '../../../components/links/link';
import PoolRow from '../../../components/row/pool.row';
import { ExtendedEther } from '../../../constants/extended-ether';
import { mediaWidthTemplates } from '../../../constants/media';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import { usePairs } from '../../../hooks/usePairs';
import { useTokenBalancesWithLoadingIndicator } from '../../../hooks/useTokenBalancesWithLoadingIndicator';
import { useTrackedTokenPairs } from '../../../hooks/useTrackedTokenPair';
import routes from '../../../routes';
import { toLiquidityToken } from '../../../utils/liquidityToken';

export default function PoolPage() {
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');

  const { account } = useActiveWeb3React();
  const history = useHistory();
  const trackedTokenPairs = useTrackedTokenPairs();
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toLiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  );

  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map(({ liquidityToken }) => liquidityToken),
    [tokenPairsWithLiquidityTokens],
  );

  const [pairsBalances, isFetchingPairBalances] = useTokenBalancesWithLoadingIndicator(
    liquidityTokens,
    account ?? undefined,
  );

  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        pairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [pairsBalances, tokenPairsWithLiquidityTokens],
  );

  const pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens));
  const isLoading =
    isFetchingPairBalances || pairs?.length < liquidityTokensWithBalances.length || pairs?.some((pair) => !pair);

  const pairsWithLiquidity = pairs.map(([, pair]) => pair).filter((pair): pair is Pair => Boolean(pair));

  pairsWithLiquidity.push(
    new Pair(
      CurrencyAmount.fromRawAmount(
        new Token(1, '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', 18, 'AAVE', 'Aave Token'),
        '10000',
      ),
      CurrencyAmount.fromRawAmount(ExtendedEther.onChain(1).wrapped, '1000'),
    ),
  );

  const renderContent = useCallback(() => {
    if (pairsWithLiquidity.length === 0) {
      return (
        <>
          <OpenedWhiteBoxSVG sx={{ height: 48, width: 48, marginBottom: '8px', alignSelf: 'center' }} />
          <Text sx={{ fontSize: 0, maxWidth: 300, alignSelf: 'center', marginBottom: 16, textAlign: 'center' }}>
            You have no position. Create your first position by click button above.
          </Text>
          <Button
            variant="buttons.small-secondary"
            sx={{ alignSelf: 'center', width: 168 }}
            onClick={() => {
              history.push(routes['chart-pools']);
            }}
          >
            View chart
          </Button>
        </>
      );
    }
    return (
      <>
        {pairsWithLiquidity.map((pair) => {
          return <PoolRow key={`${pair.token0.address}-${pair.token1.address}`} pair={pair} />;
        })}
        <Button
          variant="buttons.small-secondary"
          sx={{ alignSelf: 'center', marginTop: 16, width: 168 }}
          onClick={() => {
            history.push(routes['chart-pools']);
          }}
        >
          View chart
        </Button>
      </>
    );
  }, [history, pairsWithLiquidity]);

  return (
    <>
      <Flex
        sx={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'dark.400',
          paddingY: 32,
        }}
      >
        <Flex sx={{ flexDirection: 'column', width: 744, maxWidth: '100vw' }}>
          <Flex sx={{ justifyContent: 'space-between', marginX: 16, marginBottom: 12 }}>
            <Heading
              as="h3"
              variant="styles.h3"
              sx={{
                ...mediaWidthTemplates.upToExtraSmall({
                  fontSize: 3,
                }),
              }}
            >
              Pool
            </Heading>
            <Link variant="buttons.small-primary" sx={{ textDecoration: 'none', width: 168 }} to={routes['pool-add']}>
              <FiPlus sx={{ marginRight: '8px' }} size={32} />
              New position
            </Link>
          </Flex>

          <Text sx={{ color: 'subtitle', marginX: 16, marginBottom: 16, fontWeight: 'bold', fontSize: 0 }}>
            Your positions
          </Text>

          <Flex
            sx={{
              marginX: 16,
              flexDirection: 'column',
            }}
          >
            {renderContent()}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
