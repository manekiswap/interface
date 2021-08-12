import { stringify } from 'qs';
import { useCallback, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading, Text } from 'theme-ui';

import FormInput from '../../../components/forms/form.input';
import TokenPickerInput from '../../../components/forms/token-picker.input';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import useSwapPair from '../../../hooks/useSwapPair';
import useToggle from '../../../hooks/useToggle';
import { actions } from '../../../reducers';
import { useAppDispatch } from '../../../reducers/hooks';
import { ShortToken } from '../../../reducers/swap/types';
import routes from '../../../routes';

type InputField = 'token0' | 'token1';

export default function SwapPage() {
  const [activeSelectToken, toggleSelectToken] = useToggle(false);
  const [activeTransactionSettings, toggleTransactionSettings] = useToggle(false);

  const [activeField, setActiveField] = useState<InputField | undefined>(undefined);
  const { token0, token1 } = useSwapPair();
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
  const dispatch = useAppDispatch();
  const history = useHistory();

  const _onCloseSelectTokenModal = useCallback(
    (token: ShortToken | undefined) => {
      if (!!activeField && !!token) {
        if (token0?.address === token.address && activeField === 'token1') return;
        if (token1?.address === token.address && activeField === 'token0') return;

        const params: { from?: string; to?: string } = {};

        if (activeField === 'token0') {
          params.from = token.address;
          if (token1) {
            params.to = token1.address;
          }
        } else if (activeField === 'token1') {
          if (token0) {
            params.from = token0.address;
          }
          params.to = token.address;
        }

        history.push(`${routes.swap}?${stringify(params)}`);
      }
      toggleSelectToken();
    },
    [activeField, history, toggleSelectToken, token0, token1],
  );

  const _onCloseTransactionSettingsModal = useCallback(() => {
    toggleTransactionSettings();
  }, [toggleTransactionSettings]);

  const handleResetInput = useCallback(() => {
    history.push(routes.swap);
    dispatch(actions.swap.reset());
  }, [dispatch, history]);

  const renderContent = useCallback(() => {
    return (
      <>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text sx={{ color: 'title' }}>Select a pair</Text>
          <Flex>
            <Button variant="buttons.small-link" sx={{ marginRight: 16 }} onClick={handleResetInput}>
              Reset
            </Button>
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
        </Flex>
        <Flex sx={{ flexDirection: 'row', ...mediaWidthTemplates.upToExtraSmall({ flexDirection: 'column' }) }}>
          <Flex
            sx={{
              marginRight: 16,
              flexDirection: 'column',
              ...mediaWidthTemplates.upToExtraSmall({
                flex: 1,
                flexDirection: 'row',
                marginRight: 0,
                marginBottom: 16,
              }),
            }}
          >
            <TokenPickerInput
              sx={{
                width: 172,
                marginBottom: 16,
                ...mediaWidthTemplates.upToExtraSmall({ flex: 1, width: 'auto', marginBottom: 0, marginRight: 16 }),
              }}
              label="From"
              token={token0}
              onClick={() => {
                setActiveField('token0');
                toggleSelectToken();
              }}
            />
            <TokenPickerInput
              sx={{ width: 172, ...mediaWidthTemplates.upToExtraSmall({ flex: 1, width: 'auto' }) }}
              label="To"
              token={token1}
              onClick={() => {
                setActiveField('token1');
                toggleSelectToken();
              }}
            />
          </Flex>
          <Flex
            sx={{ flex: 1, flexDirection: 'column', ...mediaWidthTemplates.upToExtraSmall({ flexDirection: 'row' }) }}
          >
            <FormInput
              sx={{ marginBottom: 16, ...mediaWidthTemplates.upToExtraSmall({ marginBottom: 0, marginRight: 16 }) }}
              label="Amount"
            />
            <FormInput label="Amount" disabled={!!!token1} />
          </Flex>
        </Flex>
        <Button disabled sx={{ marginY: 24 }}>
          Swap
        </Button>
      </>
    );
  }, [handleResetInput, isUpToExtraSmall, toggleSelectToken, toggleTransactionSettings, token0, token1]);

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
            Swap
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
      <SelectTokenModal active={activeSelectToken} title="Select token" onClose={_onCloseSelectTokenModal} />
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} />
    </>
  );
}
