import { useWeb3React } from '@web3-react/core';
import { Button } from 'theme-ui';

import useToggle from '../../hooks/useToggle';
import { ellipsis } from '../../utils/strings';
import ConnectWalletModal from '../modals/connect-wallet.modal';

export default function ConnectWalletButton() {
  const [activeConnectWallet, toggleConnectWallet] = useToggle(false);
  const { active, account } = useWeb3React();

  let buttonLabel = 'Connect to wallet';
  if (active && !!account) {
    buttonLabel = ellipsis(account, { left: 6, right: 4 });
  }

  return (
    <>
      <Button
        variant="buttons.small-primary"
        onClick={() => {
          toggleConnectWallet();
        }}
      >
        {buttonLabel}
      </Button>
      <ConnectWalletModal
        active={activeConnectWallet}
        onClose={() => {
          toggleConnectWallet();
        }}
      />
    </>
  );
}
