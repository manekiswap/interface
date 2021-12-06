import { Button, Flex, Text } from '@theme-ui/components';
import { UnsupportedChainIdError } from '@web3-react/core';
import { useCallback } from 'react';

import { mediaWidthTemplates } from '../../constants/media';
import { useAppContext } from '../../context';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useWalletBalances } from '../../hooks/useWalletBalances';
import { ellipsis } from '../../utils/strings';
import IdentityLogo from '../logos/identity.logo';
import ConnectWalletModal from '../modals/connect-wallet.modal';

export default function ConnectWalletButton() {
  const { activeConnectWallet, toggleConnectWallet } = useAppContext();
  const { active, account, error } = useActiveWeb3React();
  const userBalance = useWalletBalances(account ? [account] : [])?.[account ?? ''];

  const renderConnect = useCallback(() => {
    if (!!error) return null;
    return (
      <>
        {active && !!account ? (
          <Flex sx={{ alignItems: 'center' }}>
            <Text
              sx={{
                marginRight: 16,
                fontWeight: 'bold',
                fontSize: 2,
                color: 'white.300',
                ...mediaWidthTemplates.upToExtraSmall({
                  display: 'none',
                }),
              }}
            >{`${userBalance?.toSignificant(3) || 0} ETH`}</Text>
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
            variant="buttons.primary"
            sx={{ height: 40, fontSize: 0, paddingX: 16 }}
            onClick={() => {
              toggleConnectWallet();
            }}
          >
            Connect to wallet
          </Button>
        )}
      </>
    );
  }, [account, active, error, toggleConnectWallet, userBalance]);

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
      {renderConnect()}
      <ConnectWalletModal
        active={activeConnectWallet}
        onClose={() => {
          toggleConnectWallet();
        }}
      />
    </>
  );
}
