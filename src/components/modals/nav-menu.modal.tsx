import { Modal, ModalContent, ModalTitle } from '@mattjennings/react-modal';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FiXCircle } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { Button, Flex } from 'theme-ui';

import routes from '../../pages/routes';
import Link from '../links/link';

interface Props {
  active: boolean;
  onClose: () => void;
}

const CloseButton = forwardRef((props: { onClick: () => void }, ref) => {
  const { onClick } = props;
  return (
    <Button variant="buttons.small-icon" onClick={onClick}>
      <FiXCircle />
    </Button>
  );
});

CloseButton.displayName = 'CloseButton';

export default function NavMenuModal(props: Props) {
  const { active, onClose } = props;
  const { t } = useTranslation(['app']);
  const { pathname } = useLocation();

  const _onClose = () => {
    onClose();
  };

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={false}
      fullScreen={true}
      animations={{
        fullScreen: {
          enter: {
            opacity: 1,
          },
          exit: {
            opacity: 0,
          },
        },
      }}
      onClose={() => _onClose()}
      open={active}
    >
      <ModalTitle
        CloseButton={CloseButton}
        sx={{
          svg: {
            height: 24,
            width: 24,
            color: '#FFFFFF !important',
          },
        }}
      />
      <ModalContent sx={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Link
            variant="buttons.ghost"
            sx={{
              fontSize: 4,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: pathname === routes.swap ? 'primary' : 'secondary',
            }}
            to={routes.swap}
            onClick={() => {
              _onClose();
            }}
          >
            {t('app:swap')}
          </Link>
          <Link
            variant="buttons.ghost"
            sx={{
              marginY: 24,
              fontSize: 4,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: pathname === routes.pool ? 'primary' : 'secondary',
            }}
            to={routes.pool}
            onClick={() => {
              _onClose();
            }}
          >
            {t('app:pool')}
          </Link>
          <Link
            variant="buttons.ghost"
            sx={{
              fontSize: 4,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: pathname === routes.vote ? 'primary' : 'secondary',
            }}
            to={routes.vote}
            onClick={() => {
              _onClose();
            }}
          >
            {t('app:vote')}
          </Link>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
