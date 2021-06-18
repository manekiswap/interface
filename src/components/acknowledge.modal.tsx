import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { colors } from '../themes/colors';

export default function AcknowledgeModal(props: { isOpen: boolean; onClose: () => void }) {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        backgroundColor="white"
        color={colors.text._04}
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
          <Text fontSize="16px" fontWeight="normal" padding={0} textAlign="center">
            {t('will_be_in_touch')}
          </Text>
        </ModalBody>

        <ModalFooter padding={'12px 0 0 0'}>
          <Button colorScheme="yellow" backgroundColor={colors.background._03} onClick={onClose} borderRadius={0}>
            {t('back_to_site')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
