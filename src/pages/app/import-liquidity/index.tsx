import { useCallback, useContext, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading } from 'theme-ui';

import TokenPickerInput from '../../../components/forms/token-picker.input';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import { utils } from '../../../constants/token';
import { AppCtx } from '../../../context';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import usePoolPair from '../../../hooks/usePoolPair';
import useToggle from '../../../hooks/useToggle';
import { actions } from '../../../reducers';
import { useAppDispatch } from '../../../reducers/hooks';
import { ShortToken } from '../../../reducers/swap/types';
import routes from '../../../routes';

type InputField = 'token0' | 'token1';

export default function ImportLiquidityPage() {
  const { account } = useActiveWeb3React();
  const [activeSelectToken, toggleSelectToken] = useToggle(false);
  const [activeField, setActiveField] = useState<InputField | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { toggleConnectWallet } = useContext(AppCtx);
  const history = useHistory();

  const { token0, token1, updateToken0, updateToken1 } = usePoolPair(routes['pool-import']);

  const _onCloseSelectTokenModal = useCallback(
    (token: ShortToken | undefined) => {
      if (!!activeField && !!token) {
        if (activeField === 'token0') updateToken0(token);
        else if (activeField === 'token1') updateToken1(token);
      }
      toggleSelectToken();
    },
    [activeField, toggleSelectToken, updateToken0, updateToken1],
  );

  const importPair = useCallback(() => {
    if (!token0 || !token1) return;
    dispatch(
      actions.token.addSerializedPair({
        serializedPair: {
          token0: utils.toSerializedToken(token0.isNative ? token0.wrapped : token0),
          token1: utils.toSerializedToken(token1.isNative ? token1.wrapped : token1),
        },
      }),
    );
    history.push(routes.pool);
  }, [dispatch, history, token0, token1]);

  const renderContent = useCallback(() => {
    return (
      <>
        <Flex
          sx={{
            flex: 1,
            marginBottom: 24,
            flexDirection: 'column',
          }}
        >
          <TokenPickerInput
            sx={{
              width: '100%',
              marginBottom: 12,
            }}
            label="Token 1"
            token={token0}
            onClick={() => {
              setActiveField('token0');
              toggleSelectToken();
            }}
          />
          <TokenPickerInput
            sx={{
              width: '100%',
            }}
            label="Token 2"
            token={token1}
            onClick={() => {
              setActiveField('token1');
              toggleSelectToken();
            }}
          />
        </Flex>

        <Button
          disabled={!token0 || !token1}
          onClick={() => {
            if (!account) toggleConnectWallet();
            else importPair();
          }}
        >
          {!!account ? 'Import' : 'Connect to wallet'}
        </Button>
      </>
    );
  }, [account, importPair, toggleConnectWallet, toggleSelectToken, token0, token1]);

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
              history.push(routes.pool);
            }}
          >
            <FiChevronLeft />
            Back to Pool Overview
          </Button>
          <Heading
            as="h3"
            variant="styles.h3"
            sx={{
              marginBottom: 12,
              marginX: 16,
              ...mediaWidthTemplates.upToExtraSmall({
                fontSize: 3,
              }),
            }}
          >
            Import Pool
          </Heading>
          <Flex
            sx={{
              marginX: 16,
              paddingY: 24,
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
      <SelectTokenModal
        active={activeSelectToken}
        title="Select token"
        disabledToken={activeField === 'token0' ? token1 : token0}
        onClose={_onCloseSelectTokenModal}
      />
    </>
  );
}
