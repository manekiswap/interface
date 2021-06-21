import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'theme-ui';

export default function AcknowledgeModal(props: { isOpen: boolean; onClose: () => void }) {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        backgroundColor="white"
        color={'black'}
        borderRadius={0}
        margin={0}
        paddingX="60px"
        paddingY="40px"
        alignItems="center"
        width="502px"
        maxWidth="calc(100% - 48px)"
      >
        <ModalHeader as="h4" fontSize="32px" fontWeight="bold" padding={0}>
          {t('thank_you_for_subscribing')}
        </ModalHeader>

        <ModalBody padding={'12px 0'}>
          <Text
            sx={{
              padding: 0,
              textAlign: 'center',
            }}
          >
            {t('will_be_in_touch')}
          </Text>
        </ModalBody>

        <ModalFooter padding={'12px 0 0 0'}>
          <Button
            sx={{
              backgroundColor: 'yellow',
              borderRadius: 0,
            }}
            onClick={onClose}
          >
            {t('back_to_site')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
