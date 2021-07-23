import { Modal, ModalContent, ModalTitle } from '@mattjennings/react-modal';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FiChevronRight } from 'react-icons/fi';
import { Button, ButtonProps, Flex, Heading, Image, Link, Spinner, Text } from 'theme-ui';

import IdentityLogo from '../../components/logo/identity.logo';
import { injected } from '../../connectors';
import { SUPPORTED_WALLETS, WalletInfo } from '../../constants/wallets';
import useActiveChainId from '../../hooks/useActiveChainId';
import usePrevious from '../../hooks/usePrevious';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { requireAsset } from '../../utils/renders';
import { ellipsis } from '../../utils/strings';

interface OptionsProps extends ButtonProps {
  header: ReactNode;
  active: boolean;
  link?: string;
  icon: string;
  description?: string;
}

function Option(props: Omit<OptionsProps, 'sx'>) {
  const { header, active, link, icon, description, onClick } = props;

  const Icon = requireAsset(icon).default;

  const _onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!!link) {
        window.open(link);
        return;
      }
      onClick && onClick(e);
    },
    [link, onClick],
  );

  return (
    <Button
      variant="buttons.secondary"
      sx={{ fontSize: 1, backgroundColor: 'rgba(92, 92, 92, 0.3)', borderWidth: 0, marginY: '4px' }}
      onClick={_onClick}
    >
      <Flex sx={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        {typeof Icon === 'string' ? (
          <Image src={Icon} sx={{ height: 24, width: 24, marginRight: 12 }} />
        ) : (
          <Icon sx={{ maxHeight: 24, maxWidth: 24, marginRight: 12 }} />
        )}
        <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          {header}
          <Text sx={{ fontSize: 0, color: 'white.300' }}>{description}</Text>
        </Flex>
      </Flex>

      <Flex sx={{ alignItems: 'center' }}>
        {active && (
          <Flex
            sx={{ height: '8px', width: '8px', borderRadius: '4px', backgroundColor: 'green.300', marginRight: '4px' }}
          />
        )}
        {!!onClick && <FiChevronRight sx={{ height: 24, width: 24, color: 'white.300' }} />}
      </Flex>
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
  const { width = 0 } = useWindowSize();
  const { active, account, connector, activate, error } = useWeb3React();
  const chainId = useActiveChainId();
  const [pendingWallet, setPendingWallet] = useState<WalletInfo | undefined>();
  const [pendingError, setPendingError] = useState<boolean>();
  const [walletView, setWalletView] = useState(!!account && !error ? WALLET_VIEWS.ACCOUNT : WALLET_VIEWS.OPTIONS);

  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);

  const _onClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (modalActive && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      _onClose();
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [_onClose, active, activePrevious, connector, connectorPrevious, error, modalActive]);

  const tryActivation = useCallback(
    async (wallet: WalletInfo) => {
      const { connector } = wallet;
      const conn = typeof connector === 'function' ? await connector() : connector;
      if (!conn) return;

      setPendingWallet(wallet); // set wallet for pending view
      setWalletView(WALLET_VIEWS.PENDING);

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

  const renderOptions = useCallback(() => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      if (isMobile) {
        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              key={key}
              header={option.name}
              active={!!option.connector && option.connector === connector}
              link={option.href}
              icon={`./images/wallets/${option.iconName}`}
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option);
              }}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                key={key}
                header="Install Metamask"
                active={!!option.connector && option.connector === connector}
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
            key={key}
            header={option.name}
            active={!!option.connector && option.connector === connector}
            link={option.href}
            icon={'./images/wallets/' + option.iconName}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option);
            }}
          />
        )
      );
    });
  }, [connector, tryActivation]);

  const renderContent = useCallback(() => {
    if (!!error) {
      return (
        <>
          <ModalTitle>
            <Heading as="h5" variant="styles.h5">
              {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}
            </Heading>
          </ModalTitle>
          <ModalContent sx={{ flexDirection: 'column' }}>
            <Heading as="h6" variant="styles.h6">
              {error instanceof UnsupportedChainIdError
                ? 'Please connect to the appropriate Ethereum network.'
                : 'Error connecting. Try refreshing the page'}
            </Heading>
          </ModalContent>
        </>
      );
    }
    if (walletView === WALLET_VIEWS.ACCOUNT) {
      const { ethereum } = window;
      const isMetaMask = !!(ethereum && ethereum.isMetaMask);
      const walletName = Object.keys(SUPPORTED_WALLETS)
        .filter(
          (type) =>
            SUPPORTED_WALLETS[type].connector === connector &&
            (connector !== injected || isMetaMask === (type === 'METAMASK')),
        )
        .map((type) => SUPPORTED_WALLETS[type].name)[0];

      return (
        <>
          <ModalTitle>
            <Heading as="h5" variant="styles.h5">
              Account
            </Heading>
          </ModalTitle>
          <ModalContent
            sx={{
              flexDirection: 'column',
              border: '1px solid',
              borderColor: 'white.300',
              borderRadius: 'lg',
              padding: 16,
            }}
          >
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text sx={{ color: 'white.300' }}>{`Connected with ${walletName}`}</Text>
              <Button
                variant="buttons.small-ghost"
                onClick={() => {
                  setWalletView(WALLET_VIEWS.OPTIONS);
                }}
              >
                Change
              </Button>
            </Flex>
            <Flex sx={{ alignItems: 'center', marginTop: 24, marginBottom: 16 }}>
              <IdentityLogo sx={{ marginRight: 16 }} />
              <Heading as="h6" variant="styles.h6">
                {ellipsis(account || '', { left: 6, right: 4 })}
              </Heading>
            </Flex>
            <Link
              variant="buttons.small-link"
              sx={{ textDecoration: 'none', alignSelf: 'center' }}
              target="_blank"
              rel="noreferrer"
              href={getExplorerLink(chainId, account || '', ExplorerDataType.ADDRESS)}
            >
              View on Explorer
            </Link>
          </ModalContent>
        </>
      );
    }

    if (walletView === WALLET_VIEWS.PENDING) {
      return (
        <>
          <ModalTitle>
            <Heading
              as="h5"
              variant="buttons.small-secondary"
              sx={{ border: 'none', padding: 0, variant: 'styles.h5' }}
              onClick={() => {
                setPendingError(undefined);
                setWalletView(WALLET_VIEWS.OPTIONS);
              }}
            >
              Back
            </Heading>
          </ModalTitle>
          <ModalContent sx={{ flexDirection: 'column' }}>
            <Text>
              <Text>By connecting a wallet, you agree to ManekiSwap’s </Text>
              <a sx={{ fontWeight: 'medium', color: 'blue.300' }}>Terms of Service</a>
              <Text> and acknowledge that you have read and understand the </Text>
              <a sx={{ fontWeight: 'medium', color: 'blue.300' }}>Maneki protocol disclaimer </a>.
            </Text>
            <Text sx={{ fontWeight: 'medium', marginTop: 24, marginBottom: '8px', color: 'white.200' }}>
              Select wallet
            </Text>
            <Flex
              sx={{
                justifyContent: !!pendingError ? 'space-between' : 'flex-start',
                alignItems: 'center',
                height: 60,
                border: '1px solid',
                borderColor: !!pendingError ? 'error' : 'white.300',
                borderRadius: 'lg',
                paddingX: 24,
                marginY: '4px',
              }}
            >
              {!!pendingError ? (
                <>
                  <Text sx={{ color: 'error' }}>Error connecting</Text>
                  <Button
                    variant="buttons.small-link"
                    onClick={() => {
                      pendingWallet && tryActivation(pendingWallet);
                    }}
                  >
                    Try again
                  </Button>
                </>
              ) : (
                <>
                  <Spinner sx={{ height: 24, width: 24, color: 'white.400', marginRight: 12 }} />
                  <Text>Initializing...</Text>
                </>
              )}
            </Flex>
            {!isMobile && !!pendingWallet && !pendingWallet.mobileOnly && (
              <Option
                header={pendingWallet.name}
                active={!!pendingWallet.connector && pendingWallet.connector === connector}
                icon={'./images/wallets/' + pendingWallet.iconName}
                description={pendingWallet.description}
              />
            )}
          </ModalContent>
        </>
      );
    }

    return (
      <>
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
          <Text sx={{ fontWeight: 'medium', marginTop: 24, marginBottom: '8px', color: 'white.200' }}>
            Select wallet
          </Text>
          {renderOptions()}
        </ModalContent>
      </>
    );
  }, [account, chainId, connector, error, pendingError, pendingWallet, renderOptions, tryActivation, walletView]);

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={false}
      fullScreen={false}
      onClose={() => _onClose()}
      open={modalActive}
      width={Math.min(448, width - 32)}
    >
      {renderContent()}
    </Modal>
  );
}
