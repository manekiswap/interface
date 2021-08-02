import { useCallback, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { Button, Flex, Heading, Text } from 'theme-ui';

import FormInput from '../../../components/forms/form.input';
import TokenPickerInput from '../../../components/forms/token-picker.input';
import TokenLogo from '../../../components/logo/token.logo';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import PriceSlider from '../../../components/slider/price.slider';
import FeeToggle from '../../../components/toggle/fee.toggle';
import { mediaWidthTemplates } from '../../../constants/media';
import { Token } from '../../../constants/token';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import usePoolPair from '../../../hooks/usePoolPair';
import useToggle from '../../../hooks/useToggle';
import { ShortToken } from '../../../reducers/swap/types';

const feeTiers = [0.05, 0.3, 1] as const;
type InputField = 'token0' | 'token1';

export default function PoolPage() {
  const [activeSelectToken, toggleSelectToken] = useToggle(false);
  const [activeTransactionSettings, toggleTransactionSettings] = useToggle(false);

  const [activeField, setActiveField] = useState<InputField | undefined>(undefined);

  const [fee, setFee] = useState<typeof feeTiers[number]>(0.3);

  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
  const { token0, token1, updateToken0, updateToken1, reset } = usePoolPair();

  const _onCloseSelectTokenModal = useCallback(
    (token: ShortToken | undefined) => {
      if (!!activeField && !!token) {
        if (token0?.address === token.address && activeField === 'token1') return;
        if (token1?.address === token.address && activeField === 'token0') return;

        if (activeField === 'token1') {
          updateToken1(Token.fromShortToken(token));
        } else {
          updateToken0(Token.fromShortToken(token));
        }
      }
      toggleSelectToken();
    },
    [activeField, toggleSelectToken, token0?.address, token1?.address, updateToken0, updateToken1],
  );

  const _onCloseTransactionSettingsModal = useCallback(() => {
    toggleTransactionSettings();
  }, [toggleTransactionSettings]);

  const handleResetInput = useCallback(() => {
    reset();
  }, [reset]);

  const renderContent = useCallback(() => {
    return (
      <>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text sx={{ color: 'title' }}>1. Select a pair</Text>
          <Flex>
            <Button variant="buttons.small-link" sx={{ marginRight: 16 }} onClick={handleResetInput}>
              Reset
            </Button>
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
          <TokenPickerInput
            sx={{ flex: 1, marginRight: 16 }}
            label="Token 1"
            token={token0}
            onClick={() => {
              setActiveField('token0');
              toggleSelectToken();
            }}
          />
          <TokenPickerInput
            sx={{ flex: 1 }}
            label="Token 2"
            token={token1}
            onClick={() => {
              setActiveField('token1');
              toggleSelectToken();
            }}
          />
        </Flex>
        <Flex sx={{ flexDirection: 'column', marginBottom: 24 }}>
          <Text sx={{ color: 'title' }}>2. Select pool</Text>
          <Text sx={{ color: 'subtitle', fontSize: 0 }}>
            Select a pool type based on your preferred liquidity provider fee.
          </Text>
          <Flex sx={{ marginTop: 12 }}>
            <FeeToggle
              active={feeTiers[0] === fee}
              value={feeTiers[0]}
              title={`${feeTiers[0]}% fee`}
              subtitle="Best for stable pairs"
              onToggle={(value: number) => setFee(value as typeof feeTiers[number])}
              sx={{ marginRight: 16 }}
            />
            <FeeToggle
              active={feeTiers[1] === fee}
              value={feeTiers[1]}
              title={`${feeTiers[1]}% fee`}
              subtitle="Best for most pairs"
              onToggle={(value: number) => setFee(value as typeof feeTiers[number])}
              sx={{ marginRight: 16 }}
            />
            <FeeToggle
              active={feeTiers[2] === fee}
              value={feeTiers[2]}
              title={`${feeTiers[2]}% fee`}
              subtitle="Best for exotic pairs"
              onToggle={(value: number) => setFee(value as typeof feeTiers[number])}
            />
          </Flex>
        </Flex>
        <Flex sx={{ flexDirection: 'column', marginBottom: 24 }}>
          <Text sx={{ color: 'title' }}>3. Select price range</Text>
          <Text sx={{ color: 'subtitle', fontSize: 0 }}>
            <span>Your liquidity will only earn fees when the market price of the pair is within your range. </span>
            <a sx={{ fontWeight: 'medium', color: 'blue.400' }}>Need help picking a range?</a>
          </Text>
          <Flex sx={{ marginTop: 12 }}>
            <PriceSlider title="Min Price" base={token0} current={token1} basePrice={1700} sx={{ marginRight: 16 }} />
            <PriceSlider title="Max Price" base={token0} current={token1} basePrice={1700} />
          </Flex>
          <Flex
            sx={{
              height: 60,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              border: '1px solid',
              borderColor: 'dark.transparent',
              borderRadius: 'base',
              paddingX: 12,
              paddingY: '8px',
              marginTop: 12,
            }}
          >
            <Text sx={{ fontSize: 0, fontWeight: 'bold', color: 'white.200' }}>Current price</Text>
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-end' }}>
              <Text sx={{ fontSize: 1, fontWeight: 'bold', color: 'white.300' }}>2100.42</Text>
              <Text sx={{ fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>
                {`${token1?.symbol || ''} per ${token0.symbol}`.trim()}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <Text sx={{ color: 'title' }}>4. Deposit amount</Text>
          <FormInput
            leftNode={
              !!token0 && (
                <Flex sx={{ marginLeft: 12 }}>
                  <TokenLogo token={token0} />
                  <Text sx={{ marginLeft: 12 }}>{token0.symbol}</Text>
                </Flex>
              )
            }
            sx={{ marginTop: 12, input: { textAlign: 'right' } }}
          ></FormInput>
          <FormInput
            leftNode={
              !!token1 && (
                <Flex sx={{ marginLeft: 12 }}>
                  <TokenLogo token={token1} />
                  <Text sx={{ marginLeft: 12 }}>{token1.symbol}</Text>
                </Flex>
              )
            }
            sx={{ marginTop: '8px', input: { textAlign: 'right' } }}
          ></FormInput>
        </Flex>
        <Button disabled sx={{ marginY: 24 }}>
          Add to pool
        </Button>
      </>
    );
  }, [fee, isUpToExtraSmall, toggleSelectToken, token0, token1]);

  return (
    <>
      <Flex
        sx={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'dark.400',
        }}
      >
        <Flex sx={{ flexDirection: 'column', width: 512, maxWidth: '100vw' }}>
          <Heading
            as="h3"
            variant="styles.h3"
            sx={{
              marginTop: 32,
              marginBottom: 12,
              marginX: 16,
              ...mediaWidthTemplates.upToExtraSmall({
                fontSize: 3,
              }),
            }}
          >
            Pool
          </Heading>
          <Flex
            sx={{
              marginX: 16,
              paddingY: 24,
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
      <SelectTokenModal active={activeSelectToken} title="Select token" onClose={_onCloseSelectTokenModal} />
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} />
    </>
  );
}
