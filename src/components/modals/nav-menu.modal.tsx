import { Modal, ModalContent, ModalTitle } from '@mattjennings/react-modal';
import { Button, Flex } from '@theme-ui/components';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FiXCircle } from 'react-icons/fi';
import { useRouteMatch } from 'react-router-dom';

import routes from '../../routes';
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

  const matchedSwapRoute = useRouteMatch([routes.swap, routes.swapNext]);
  const matchedPoolRoute = useRouteMatch([routes.pool, routes['pool-add'], routes['pool-remove']]);
  const matchedChartRoute = useRouteMatch([
    routes.chart,
    routes['chart-overview'],
    routes['chart-pools'],
    routes['chart-tokens'],
  ]);

  const _onClose = () => {
    onClose();
  };

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={false}
      closeOnEscKey={false}
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
          svg: { color: '#FFFFFF !important' },
        }}
      />
      <ModalContent sx={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Link
            variant="buttons.ghost"
            sx={{
              fontSize: 3,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: matchedSwapRoute ? 'velvet.300' : 'white.300',
            }}
            to={routes.swapNext}
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
              fontSize: 3,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: matchedPoolRoute ? 'velvet.300' : 'white.300',
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
              fontSize: 3,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: matchedChartRoute ? 'velvet.300' : 'white.300',
            }}
            to={routes.chart}
            onClick={() => {
              _onClose();
            }}
          >
            {t('app:chart')}
          </Link>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
