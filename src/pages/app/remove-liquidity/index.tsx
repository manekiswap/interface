import { useCallback } from 'react';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading, Text } from 'theme-ui';

import TokenLogo from '../../../components/logos/token.logo';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import useToggle from '../../../hooks/useToggle';

export default function RemoveLiquidityPage() {
  const history = useHistory();
  const [activeTransactionSettings, toggleTransactionSettings] = useToggle(false);
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');

  const _onCloseTransactionSettingsModal = useCallback(() => {
    toggleTransactionSettings();
  }, [toggleTransactionSettings]);

  const renderContent = useCallback(() => {
    return (
      <>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Heading as="h5" variant="styles.h5" sx={{}}>
            Remove liquidity
          </Heading>
          <Flex>
            <Button
              variant="buttons.small-link"
              onClick={() => {
                toggleTransactionSettings();
              }}
            >
              <FiSettings sx={{ marginRight: '8px' }} />
              {!isUpToExtraSmall && 'Setting'}
            </Button>
          </Flex>

          {/* <TokenLogo token={pair.token0} />
          <TokenLogo token={pair.token1} sx={{ marginLeft: '-8px' }} />
          <Text sx={{ marginLeft: 12, fontWeight: 'bold' }}>{`${pair.token0.symbol}/${pair.token1.symbol}`}</Text> */}
        </Flex>
      </>
    );
  }, [isUpToExtraSmall, toggleTransactionSettings]);

  return (
    <>
      <Flex
        sx={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'dark.400',
          paddingY: 32,
        }}
      >
        <Flex sx={{ flexDirection: 'column', width: 512, maxWidth: '100vw' }}>
          <Button
            variant="buttons.link"
            sx={{ alignSelf: 'flex-start', marginX: 16, marginBottom: 16 }}
            onClick={() => {
              history.goBack();
            }}
          >
            <FiChevronLeft />
            Back
          </Button>
          <Flex
            sx={{
              marginX: 16,
              paddingY: 24,
              marginBottom: 24,
              flexDirection: 'column',
              backgroundColor: 'background',
              boxShadow: 'card',
              borderRadius: 'lg',
              paddingX: 24,
              ...mediaWidthTemplates.upToExtraSmall({
                paddingX: 16,
              }),
            }}
          >
            {renderContent()}
          </Flex>
        </Flex>
      </Flex>
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} />
    </>
  );
}
