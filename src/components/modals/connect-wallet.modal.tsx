import { Modal, ModalContent, ModalTitle } from '@mattjennings/react-modal';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FiChevronRight } from 'react-icons/fi';
import { Button, Flex, Heading, Image, Text } from 'theme-ui';

import { injected } from '../../connectors';
import { SUPPORTED_WALLETS } from '../../constants';
import usePrevious from '../../hooks/usePrevious';
import { requireAsset } from '../../utils/renders';

function Option(props: { header: ReactNode; link?: string; icon: string; onClick?: () => void }) {
  const { header, icon, link, onClick } = props;

  const Icon = requireAsset(icon).default;

  return (
    <Button
      variant="buttons.secondary"
      sx={{ fontSize: 1, backgroundColor: 'rgba(92, 92, 92, 0.3)', borderWidth: 0, marginY: '4px' }}
      onClick={onClick}
    >
      <Flex sx={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        {typeof Icon === 'string' ? (
          <Image src={Icon} sx={{ height: 24, width: 24, marginRight: 12 }} />
        ) : (
          <Icon sx={{ maxHeight: 24, maxWidth: 24, marginRight: 12 }} />
        )}
        {header}
      </Flex>
      <FiChevronRight sx={{ height: 24, width: 24, color: 'white.300' }} />
    </Button>
  );
}

const WALLET_VIEWS = {
  OPTIONS: 'options',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

interface Props {
  active: boolean;
  onClose: () => void;
}

export default function ConnectWalletModal(props: Props) {
  const { active: modalActive, onClose } = props;
  const { active, account, connector, activate, error, deactivate } = useWeb3React();
  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();
  const [pendingError, setPendingError] = useState<boolean>();

  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);

  const _onClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (modalActive && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      _onClose();
    }
  }, [_onClose, active, activePrevious, connector, connectorPrevious, error, modalActive]);

  const tryActivation = useCallback(
    async (connector: (() => Promise<AbstractConnector>) | AbstractConnector | undefined) => {
      const conn = typeof connector === 'function' ? await connector() : connector;
      if (!conn) return;

      setPendingWallet(conn); // set wallet for pending view
      // setWalletView(WALLET_VIEWS.PENDING);

      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (conn instanceof WalletConnectConnector && conn.walletConnectProvider?.wc?.uri) {
        conn.walletConnectProvider = undefined;
      }

      try {
        await activate(conn, undefined, true);
      } catch (error) {
        if (error instanceof UnsupportedChainIdError) {
          activate(conn); // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true);
        }
      }
    },
    [activate],
  );

  const renderContent = useCallback(() => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      if (option.connector === injected) {
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                key={key}
                header="Install Metamask"
                link={'https://metamask.io/'}
                icon="./images/wallets/metamask.png"
              />
            );
          } else {
            return null; // dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            onClick={() => {
              !option.href && tryActivation(option.connector);
            }}
            key={key}
            header={option.name}
            icon={'./images/wallets/' + option.iconName}
          />
        )
      );
    });
  }, [tryActivation]);

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={false}
      fullScreen={false}
      onClose={() => _onClose()}
      open={modalActive}
      width={600}
    >
      <ModalTitle>
        <Heading as="h5" variant="styles.h5">
          Connect to wallet
        </Heading>
      </ModalTitle>

      <ModalContent sx={{ flexDirection: 'column' }}>
        <Text>
          <Text>By connecting a wallet, you agree to ManekiSwap’s </Text>
          <a sx={{ fontWeight: 'medium', color: 'blue.300' }}>Terms of Service</a>
          <Text> and acknowledge that you have read and understand the </Text>
          <a sx={{ fontWeight: 'medium', color: 'blue.300' }}>Maneki protocol disclaimer </a>.
        </Text>
        <Text sx={{ fontWeight: 'medium', marginTop: 24, marginBottom: '8px', color: 'white.200' }}>Select wallet</Text>
        {renderContent()}
      </ModalContent>
    </Modal>
  );
}
