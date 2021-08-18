import { useCallback, useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Button, Flex, Heading, Text } from 'theme-ui';

import OpenedWhiteBoxSVG from '../../../assets/images/icons/opened-white-box.svg';
import TokenLogo from '../../../components/logos/token.logo';
import FeePicker from '../../../components/pickers/fee.picker';
import { mediaWidthTemplates } from '../../../constants/media';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import { useTokenBalancesWithLoadingIndicator } from '../../../hooks/useTokenBalancesWithLoadingIndicator';
import { useTrackedTokenPairs } from '../../../hooks/useTrackedTokenPair';
import { ShortToken } from '../../../reducers/swap/types';
import { toLiquidityToken } from '../../../utils/liquidityToken';

export default function PoolPage() {
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');

  const { account } = useActiveWeb3React();
  const trackedTokenPairs = useTrackedTokenPairs();
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toLiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  );

  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  );

  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    liquidityTokens,
    account ?? undefined,
  );

  console.log(v2PairsBalances);

  const renderContent = useCallback(() => {
    return (
      <>
        <OpenedWhiteBoxSVG sx={{ height: 48, width: 48, marginBottom: '8px', alignSelf: 'center' }} />
        <Text sx={{ fontSize: 0, maxWidth: 300, alignSelf: 'center', marginBottom: 16, textAlign: 'center' }}>
          You have no position. Create your first position by click button above.
        </Text>
        <Button variant="buttons.small-secondary" sx={{ alignSelf: 'center' }}>
          View chart
        </Button>
      </>
    );
  }, []);

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
        <Flex sx={{ flexDirection: 'column', width: 512, maxWidth: '100vw' }}>
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
            <Button variant="buttons.small-primary" sx={{}}>
              <FiPlus sx={{ marginRight: '8px' }} size={32} />
              New position
            </Button>
          </Flex>

          <Text sx={{ color: 'subtitle', marginX: 16, marginBottom: 16, fontWeight: 'bold', fontSize: 0 }}>
            Your positions
          </Text>

          <Flex
            sx={{
              marginX: 16,
              flexDirection: 'column',
              ...mediaWidthTemplates.upToExtraSmall({
                paddingX: 16,
              }),
            }}
          >
            {renderContent()}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
