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

export default function ConfirmModal(props: Props) {
  const { active, title, content, confirmText, onClose, onOpen } = props;

  useEffect(() => {
    if (!active) return;
    onOpen && onOpen();
  }, [active, onOpen]);

  return (
    <Modal
      fullScreen={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingX: 64,
        paddingY: 48,
        textAlign: 'left',
      }}
      open={active}
      closeOnOutsideClick={true}
      onClose={onClose}
    >
      <ModalTitle sx={{ padding: 0 }}>
        <Heading as="h4" variant="styles.h4">
          {title}
        </Heading>
      </ModalTitle>

      <ModalContent sx={{ paddingX: 0, paddingTop: 16, paddingBottom: 24 }}>
        <Text>{content}</Text>
      </ModalContent>

      <ModalFooter sx={{ padding: 0 }}>
        <Button variant="buttons.primary" onClick={onClose}>
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
