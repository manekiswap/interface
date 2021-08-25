import { useCallback } from 'react';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Flex, Heading, Text } from 'theme-ui';

import TokenLogo from '../../../components/logos/token.logo';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import AmountSlider from '../../../components/sliders/amount.slider';
import { mediaWidthTemplates } from '../../../constants/media';
import useBurnPair from '../../../hooks/useBurnPair';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import useToggle from '../../../hooks/useToggle';
import routes from '../../../routes';

export default function RemoveLiquidityPage() {
  const history = useHistory();
  const [activeTransactionSettings, toggleTransactionSettings] = useToggle(false);
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
  const { formattedAmounts, pair, error, updateBurnPercent } = useBurnPair('0');

  const _onCloseTransactionSettingsModal = useCallback(() => {
    toggleTransactionSettings();
  }, [toggleTransactionSettings]);

  const renderContent = useCallback(() => {
    if (!pair) return null;
    return (
      <>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Heading as="h5" variant="styles.h5" sx={{}}>
            Remove liquidity
          </Heading>
          <Flex>
            <Button
              variant="buttons.small-link"
              onClick={() => {
                toggleTransactionSettings();
              }}
            >
              <FiSettings sx={{ marginRight: '8px' }} />
              {!isUpToExtraSmall && 'Setting'}
            </Button>
          </Flex>
        </Flex>

        <Flex sx={{ marginBottom: 24 }}>
          <TokenLogo token={pair.token0} />
          <TokenLogo token={pair.token1} sx={{ marginLeft: '4px' }} />
          <Text sx={{ marginLeft: 12, fontWeight: 'bold' }}>{`${pair.token0.symbol}/${pair.token1.symbol}`}</Text>
        </Flex>
        <AmountSlider sx={{ marginBottom: 24 }} onSlide={(value) => updateBurnPercent(`${value}`)} />
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Pooled ${pair.token0.symbol}:`}</Text>
          <Flex>
            <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>
              {formattedAmounts.CURRENCY_A}
            </Text>
            <TokenLogo token={pair.token0} />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Pooled ${pair.token1.symbol}:`}</Text>
          <Flex>
            <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>
              {formattedAmounts.CURRENCY_B}
            </Text>
            <TokenLogo token={pair.token1} />
          </Flex>
        </Flex>
        <Divider sx={{ marginBottom: 12 }} />
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Your pool tokens:`}</Text>
          <Text sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}>{formattedAmounts.LIQUIDITY}</Text>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', marginBottom: 24 }}>
          <Text sx={{ fontWeight: 'bold', color: 'white.300' }}>{`Your pool share:`}</Text>
          <Text
            sx={{ fontWeight: 'bold', color: 'white.300', marginRight: '8px' }}
          >{`${formattedAmounts.LIQUIDITY_PERCENT}%`}</Text>
        </Flex>

        <Button>Remove liquidity</Button>
      </>
    );
  }, [
    formattedAmounts.CURRENCY_A,
    formattedAmounts.CURRENCY_B,
    formattedAmounts.LIQUIDITY,
    formattedAmounts.LIQUIDITY_PERCENT,
    isUpToExtraSmall,
    pair,
    toggleTransactionSettings,
    updateBurnPercent,
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
            Back
          </Button>
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
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} />
    </>
  );
}
