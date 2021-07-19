import { useCallback, useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Button, Flex, Heading, Text } from 'theme-ui';

import FormInput from '../../../components/forms/form.input';
import TokenPickerInput from '../../../components/forms/token-picker.input';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import useSwapPair from '../../../hooks/useSwapPair';
import useToggle from '../../../hooks/useToggle';
import { actions } from '../../../reducers';
import { ShortToken } from '../../../reducers/swap/types';

type InputField = 'token0' | 'token1';

export default function SwapPage() {
  const [activeSelectToken, toggleSelectToken] = useToggle(false);

  const [activeField, setActiveField] = useState<InputField | undefined>(undefined);
  const { token0, token1 } = useSwapPair();
  const dispatch = useDispatch();

  const handleCloseModal = useCallback(
    (token: ShortToken | undefined) => {
      if (!!activeField && !!token) {
        dispatch(actions.swap.update({ field: activeField, token }));
      }
      toggleSelectToken();
    },
    [activeField, dispatch, toggleSelectToken],
  );

  const handleResetInput = useCallback(() => {
    dispatch(actions.swap.reset());
  }, [dispatch]);

  useEffect(() => {
    handleResetInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex
        sx={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'muted',
        }}
      >
        <Flex sx={{ flexDirection: 'column', minWidth: 512 }}>
          <Heading as="h3" variant="styles.h3" sx={{ marginTop: 32, marginBottom: 12 }}>
            Swap
          </Heading>
          <Flex
            sx={{
              paddingX: 24,
              paddingY: '8px',
              flexDirection: 'column',
              backgroundColor: 'background',
              boxShadow: 'card',
              borderRadius: 'lg',
            }}
          >
            <Flex sx={{ marginY: 16, alignItems: 'center', justifyContent: 'space-between' }}>
              <Text sx={{ color: 'label' }}>Select a pair</Text>
              <Flex>
                <Button variant="buttons.small-link" sx={{ marginRight: 16 }} onClick={handleResetInput}>
                  Reset
                </Button>
                <Button variant="buttons.small-link">
                  <FiSettings sx={{ marginRight: '8px' }} />
                  Setting
                </Button>
              </Flex>
            </Flex>
            <Flex>
              <TokenPickerInput
                sx={{ width: 172, marginRight: 16 }}
                label="From"
                token={token0}
                onClick={() => {
                  setActiveField('token0');
                  toggleSelectToken();
                }}
              />
              <FormInput sx={{ flex: 1 }} label="Amount" />
            </Flex>
            <Flex sx={{ marginTop: 16 }}>
              <TokenPickerInput
                sx={{ width: 172, marginRight: 16 }}
                label="To"
                token={token1}
                onClick={() => {
                  setActiveField('token1');
                  toggleSelectToken();
                }}
              />
              <FormInput sx={{ flex: 1 }} label="Amount" disabled={!!!token1} />
            </Flex>
            <Button disabled sx={{ marginY: 24 }}>
              Swap
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <SelectTokenModal active={activeSelectToken} title="Select token" onClose={handleCloseModal} />
    </>
  );
}
