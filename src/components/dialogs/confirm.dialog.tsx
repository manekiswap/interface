import { Modal, ModalContent, ModalFooter, ModalTitle } from '@mattjennings/react-modal';
import { useEffect } from 'react';
import { Button, Heading, Text } from 'theme-ui';

interface Props {
  active: boolean;
  title: string;
  content: string;
  confirmText: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export default function ConfirmDialog(props: Props) {
  const { active, title, content, confirmText, onClose, onOpen } = props;

  useEffect(() => {
    if (!active) return;
    onOpen && onOpen();
  }, [active, onOpen]);

  return (
    <Modal allowClose={false} closeOnOutsideClick={true} fullScreen={false} onClose={onClose} open={active} width={512}>
      <ModalTitle sx={{ justifyContent: 'center' }}>
        <Heading as="h4" variant="styles.h4">
          {title}
        </Heading>
      </ModalTitle>

      <ModalContent sx={{ justifyContent: 'center' }}>
        <Text>{content}</Text>
      </ModalContent>

      <ModalFooter sx={{ justifyContent: 'center' }}>
        <Button variant="buttons.primary" onClick={onClose}>
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
