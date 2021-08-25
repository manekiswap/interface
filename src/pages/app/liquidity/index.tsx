import { useCallback } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Text } from 'theme-ui';

import TokenLogo from '../../../components/logos/token.logo';
import { mediaWidthTemplates } from '../../../constants/media';
import useBurnPair from '../../../hooks/useBurnPair';
import routes, { buildPoolRoute } from '../../../routes';

export default function LiquidityPage() {
  const history = useHistory();
  const { formattedAmounts, pair, error } = useBurnPair('100');

  const renderContent = useCallback(() => {
    if (!pair) return null;
    return (
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Pooled ${pair.token0.symbol}:`}</Text>
          <Flex>
            <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>
              {`${formattedAmounts.CURRENCY_A} ${pair.token0.symbol}`}
            </Text>
            <TokenLogo token={pair.token0} />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Pooled ${pair.token1.symbol}:`}</Text>
          <Flex>
            <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>
              {`${formattedAmounts.CURRENCY_B} ${pair.token1.symbol}`}
            </Text>
            <TokenLogo token={pair.token1} />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Your pool tokens:`}</Text>
          <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>{formattedAmounts.LIQUIDITY}</Text>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Your pool share:`}</Text>
          <Text
            sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}
          >{`${formattedAmounts.LIQUIDITY_PERCENT}%`}</Text>
        </Flex>
      </Flex>
    );
  }, [
    formattedAmounts.CURRENCY_A,
    formattedAmounts.CURRENCY_B,
    formattedAmounts.LIQUIDITY,
    formattedAmounts.LIQUIDITY_PERCENT,
    pair,
  ]);

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
          <Button
            variant="buttons.link"
            sx={{ alignSelf: 'flex-start', marginX: 16, marginBottom: 16 }}
            onClick={() => {
              history.push(routes.pool);
            }}
          >
            <FiChevronLeft />
            Back to Pool Overview
          </Button>
          {pair && (
            <Flex
              sx={{
                marginX: 16,
                marginBottom: 24,
                justifyContent: 'space-between',
                alignItems: 'center',
                ...mediaWidthTemplates.upToExtraSmall({
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                }),
              }}
            >
              <Flex>
                <TokenLogo token={pair.token0} />
                <TokenLogo token={pair.token1} sx={{ marginLeft: '4px' }} />
                <Text sx={{ marginLeft: 12, fontWeight: 'bold' }}>{`${pair.token0.symbol}/${pair.token1.symbol}`}</Text>
              </Flex>
              <Flex
                sx={mediaWidthTemplates.upToExtraSmall({
                  width: '100%',
                  marginTop: 24,
                })}
              >
                <Button
                  variant="buttons.small-secondary"
                  sx={{
                    marginRight: 12,
                    ...mediaWidthTemplates.upToExtraSmall({
                      flex: 1,
                    }),
                  }}
                  onClick={() => {
                    history.push(
                      buildPoolRoute(
                        { address0: pair.token0.address, address1: pair.token1.address },
                        routes['pool-add'],
                      ),
                    );
                  }}
                >
                  Increase liquidity
                </Button>
                <Button
                  variant="buttons.small-primary"
                  sx={mediaWidthTemplates.upToExtraSmall({
                    flex: 1,
                  })}
                  onClick={() => {
                    history.push(
                      buildPoolRoute(
                        { address0: pair.token0.address, address1: pair.token1.address },
                        routes['pool-remove'],
                      ),
                    );
                  }}
                >
                  Remove liquidity
                </Button>
              </Flex>
            </Flex>
          )}
          <Flex
            sx={{
              marginX: 16,
              paddingY: 24,
              marginBottom: 24,
              flexDirection: 'column',
              backgroundColor: 'background',
              boxShadow: 'card',
              borderRadius: 'lg',
              paddingX: 24,
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
