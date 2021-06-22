import { Modal, ModalContent, ModalFooter, ModalTitle } from '@mattjennings/react-modal';
import { useTranslation } from 'react-i18next';
import { Button, Heading, Text } from 'theme-ui';

export default function AcknowledgeModal(props: { isOpen: boolean; onClose: () => void }) {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();

  return (
    <Modal
      fullScreen={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingX: 60,
        paddingY: 40,
        textAlign: 'center',
      }}
      open={isOpen}
      onClose={onClose}
    >
      <ModalTitle sx={{ padding: 0 }}>
        <Heading as="h4" variant="styles.h4">
          {t('thank_you_for_subscribing')}
        </Heading>
      </ModalTitle>

      <ModalContent sx={{ paddingY: 12 }}>
        <Text>{t('will_be_in_touch')}</Text>
      </ModalContent>

      <ModalFooter sx={{ paddingTop: 12 }}>
        <Button variant="buttons.primary" onClick={onClose}>
          {t('back_to_site')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
