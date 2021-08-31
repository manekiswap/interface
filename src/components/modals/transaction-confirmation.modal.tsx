import { Currency, Trade, TradeType } from '@manekiswap/sdk';
import { Modal, ModalContent, ModalTitle } from '@mattjennings/react-modal';
import { useCallback, useEffect } from 'react';
import { Button, Flex, Heading, Link as ExternalLink, Text } from 'theme-ui';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { ellipsis } from '../../utils/strings';

interface Props {
  active: boolean;
  attemptingTxn: boolean;
  description: string;
  txHash: string;
  onClose: () => void;
}

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param args either a pair of V2 trades or a pair of V3 trades
 */
function tradeMeaningfullyDiffers(
  ...args: [Trade<Currency, Currency, TradeType>, Trade<Currency, Currency, TradeType>]
): boolean {
  const [tradeA, tradeB] = args;
  return (
    tradeA.tradeType !== tradeB.tradeType ||
    !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) ||
    !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
    !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency) ||
    !tradeA.outputAmount.equalTo(tradeB.outputAmount)
  );
}

export default function TransactionConfirmationModal(props: Props) {
  const { active, attemptingTxn, description, txHash, onClose } = props;
  const { width = 0 } = useWindowSize();
  const { chainId } = useActiveWeb3React();

  const _onClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!attemptingTxn && !txHash && active) {
      const timeout = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [active, attemptingTxn, onClose, txHash]);

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={false}
      fullScreen={false}
      onClose={() => _onClose()}
      open={active}
      width={Math.min(448, width - 32)}
    >
      <ModalTitle />

      <ModalContent sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Heading as="h6" variant="styles.h6">
          {attemptingTxn ? `Waiting for confirmation` : txHash ? 'Confirmed' : 'Rejected by user'}
        </Heading>
        <Text sx={{ color: 'white.300', fontWeight: 'bold', fontSize: 0, marginTop: 16, marginBottom: '4px' }}>
          {description}
        </Text>
        {txHash ? (
          <Button
            as={ExternalLink}
            variant="buttons.small-ghost"
            sx={{ paddingY: 0, height: 'unset', marginBottom: 16 }}
            {...{ target: '_blank', href: getExplorerLink(chainId ?? -1, txHash, ExplorerDataType.TRANSACTION) }}
          >
            {`View transaction ${ellipsis(txHash, { left: 6, right: 4 })} in explorer`}
          </Button>
        ) : attemptingTxn ? (
          <Text sx={{ color: 'yellow.300', fontWeight: 'bold', fontSize: 0, marginBottom: 16 }}>
            Please confirm transaction in your wallet
          </Text>
        ) : (
          <Flex sx={{ marginBottom: 16 }} />
        )}
      </ModalContent>
    </Modal>
  );
}
