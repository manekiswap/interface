import { Button, Flex, Text } from '@theme-ui/components';
import { useCallback } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import DualTokenLogo from '../../../components/logos/dual-token.logo';
import TokenLogo from '../../../components/logos/token.logo';
import { mediaWidthTemplates } from '../../../constants/media';
import useBurnPair from '../../../hooks/useBurnPair';
import routes, { buildPoolRoute } from '../../../routes';
import getAddress from '../../../utils/getAddress';

export default function LiquidityPage() {
  const history = useHistory();
  const {
    currencies: { CURRENCY_A: currencyA, CURRENCY_B: currencyB },
    formattedAmounts,
  } = useBurnPair('100');

  const renderContent = useCallback(() => {
    if (!currencyA || !currencyB) return null;
    return (
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Pooled ${currencyA.symbol}:`}</Text>
          <Flex>
            <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>
              {formattedAmounts.CURRENCY_A}
            </Text>
            <TokenLogo currency={currencyA} />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Pooled ${currencyB.symbol}:`}</Text>
          <Flex>
            <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>
              {formattedAmounts.CURRENCY_B}
            </Text>
            <TokenLogo currency={currencyB} />
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
    currencyA,
    currencyB,
    formattedAmounts.CURRENCY_A,
    formattedAmounts.CURRENCY_B,
    formattedAmounts.LIQUIDITY,
    formattedAmounts.LIQUIDITY_PERCENT,
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
          {currencyA && currencyB && (
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
              <Flex sx={{ alignItems: 'center' }}>
                <DualTokenLogo currencyA={currencyA} currencyB={currencyB} />
                <Text sx={{ marginLeft: 12, fontWeight: 'bold' }}>{`${currencyA.symbol} - ${currencyB.symbol}`}</Text>
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
                        { address0: getAddress(currencyA), address1: getAddress(currencyB) },
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
                        { address0: getAddress(currencyA), address1: getAddress(currencyB) },
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
