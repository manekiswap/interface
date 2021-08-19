import { Modal, ModalTitle } from '@mattjennings/react-modal';
import { useCallback } from 'react';
import { Heading } from 'theme-ui';

import { useWindowSize } from '../../hooks/useWindowSize';

interface Props {
  active: boolean;
  onClose: (confirm: boolean) => void;
}

export default function ReviewLiquidityModal(props: Props) {
  const { active, onClose } = props;
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
    </Modal>
  );
}
