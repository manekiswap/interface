import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Button } from 'theme-ui';

import useToggle from '../../hooks/useToggle';
import { ellipsis } from '../../utils/strings';
import IdentityLogo from '../logos/identity.logo';
import ConnectWalletModal from '../modals/connect-wallet.modal';

export default function ConnectWalletButton() {
  const [activeConnectWallet, toggleConnectWallet] = useToggle(false);
  const { active, account, error } = useWeb3React();

  return (
    <>
      {!!error && error instanceof UnsupportedChainIdError && (
        <Button
          variant="buttons.small-error"
          onClick={() => {
            toggleConnectWallet();
          }}
        >
          Wrong network
        </Button>
      )}
      {active && !!account ? (
        <Button
          variant="buttons.small-secondary"
          sx={{ alignItems: 'center', backgroundColor: 'dark.transparent', border: 'none' }}
          onClick={() => {
            toggleConnectWallet();
          }}
        >
          <IdentityLogo sx={{ marginRight: 16 }} />
          {ellipsis(account, { left: 6, right: 4 })}
        </Button>
      ) : (
        <Button
          variant="buttons.small-primary"
          onClick={() => {
            toggleConnectWallet();
          }}
        >
          Connect to wallet
        </Button>
      )}
      <ConnectWalletModal
        active={activeConnectWallet}
        onClose={() => {
          toggleConnectWallet();
        }}
      />
    </>
  );
}
