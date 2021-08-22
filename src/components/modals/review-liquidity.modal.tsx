import { Modal, ModalContent, ModalFooter, ModalTitle } from '@mattjennings/react-modal';
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { useCallback } from 'react';
import { Button, Divider, Flex, Heading, Text } from 'theme-ui';

import { useWindowSize } from '../../hooks/useWindowSize';
import TokenLogo from '../logos/token.logo';

interface Props {
  active: boolean;
  token0?: CurrencyAmount<Currency>;
  token1?: CurrencyAmount<Currency>;
  onClose: (confirm: boolean) => void;
}

export default function ReviewLiquidityModal(props: Props) {
  const { active, token0, token1, onClose } = props;
  const { width = 0 } = useWindowSize();

  const _onClose = useCallback(
    (confirm: boolean) => {
      onClose(confirm);
    },
    [onClose],
  );

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={false}
      fullScreen={false}
      onClose={() => _onClose(false)}
      open={active}
      width={Math.min(448, width - 32)}
    >
      <ModalTitle>
        <Heading as="h5" variant="styles.h5">
          Review your liquidity
        </Heading>
      </ModalTitle>

      <ModalContent sx={{ flexDirection: 'column', backgroundColor: 'dark.500', borderRadius: 'base' }}>
        {token0 && token1 && (
          <>
            <Flex sx={{ paddingX: 16, paddingY: 12 }}>
              <TokenLogo token={token0.currency} />
              <Text sx={{ color: 'white.300', marginLeft: 12 }}>{token0.currency.symbol}</Text>
              <Text sx={{ marginLeft: 'auto', color: 'white.300' }}>{token0.toFixed()}</Text>
            </Flex>
            <Flex sx={{ paddingX: 16, paddingY: 12 }}>
              <TokenLogo token={token1.currency} />
              <Text sx={{ color: 'white.300', marginLeft: 12 }}>{token1.currency.symbol}</Text>
              <Text sx={{ marginLeft: 'auto', color: 'white.300' }}>{token1.toFixed()}</Text>
            </Flex>
            <Divider sx={{ marginX: 16 }} />
            <Flex sx={{ paddingX: 16, paddingY: 12 }}>
              <Text sx={{ color: 'white.300' }}>Fee tier</Text>
              <Text sx={{ marginLeft: 'auto', color: 'white.300' }}>0.03%</Text>
            </Flex>
          </>
        )}
      </ModalContent>

      <ModalFooter sx={{ flexDirection: 'column' }}>
        <Button
          variant="buttons.small-primary"
          sx={{ width: '100%', marginBottom: '8px' }}
          onClick={() => {
            _onClose(true);
          }}
        >
          Add liquidity
        </Button>
        <Button
          variant="buttons.small-ghost"
          sx={{ width: '100%', color: 'white.300' }}
          onClick={() => {
            _onClose(false);
          }}
        >
          Go back
        </Button>
      </ModalFooter>
    </Modal>
  );
}
