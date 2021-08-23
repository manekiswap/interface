import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useContext } from 'react';
import { Button, Flex, Text } from 'theme-ui';

import { AppCtx } from '../../context';
import { useETHBalances } from '../../hooks/useEthBalances';
import { ellipsis } from '../../utils/strings';
import IdentityLogo from '../logos/identity.logo';
import ConnectWalletModal from '../modals/connect-wallet.modal';

export default function ConnectWalletButton() {
  const { activeConnectWallet, toggleConnectWallet } = useContext(AppCtx);
  const { active, account, error } = useWeb3React();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ''];

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
        <Flex sx={{ alignItems: 'center' }}>
          <Text sx={{ marginRight: 16, fontWeight: 'bold', fontSize: 2, color: 'white.300' }}>{`${
            userEthBalance?.toSignificant(3) || 0
          } ETH`}</Text>
          <Button
            variant="buttons.small-ghost"
            sx={{ alignItems: 'center', backgroundColor: 'dark.500', color: 'white.200' }}
            onClick={() => {
              toggleConnectWallet();
            }}
          >
            <IdentityLogo sx={{ marginRight: 16 }} />
            {ellipsis(account, { left: 6, right: 4 })}
          </Button>
        </Flex>
      ) : (
        <Button
          variant="buttons.small-secondary"
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
