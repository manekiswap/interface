import { useCallback, useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Button, Flex, Heading, Text } from 'theme-ui';

import FormInput from '../../../components/forms/form.input';
import TokenPickerInput from '../../../components/forms/token-picker.input';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import useSwapPair from '../../../hooks/useSwapPair';
import useToggle from '../../../hooks/useToggle';
import { actions } from '../../../reducers';
import { ShortToken } from '../../../reducers/swap/types';

type InputField = 'token0' | 'token1';

export default function SwapPage() {
  const [activeSelectToken, toggleSelectToken] = useToggle(false);

  const [activeField, setActiveField] = useState<InputField | undefined>(undefined);
  const { token0, token1 } = useSwapPair();
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
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

  const renderContent = useCallback(() => {
    if (isUpToExtraSmall) {
      return (
        <>
          <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text sx={{ color: 'label' }}>Select a pair</Text>
            <Flex>
              <Button variant="buttons.small-link" sx={{ marginRight: 16 }} onClick={handleResetInput}>
                Reset
              </Button>
              <Button variant="buttons.small-link">
                <FiSettings />
              </Button>
            </Flex>
          </Flex>
          <Flex>
            <Flex sx={{ flexDirection: 'column', marginRight: '8px' }}>
              <TokenPickerInput
                sx={{ width: '100%', marginBottom: 16 }}
                label="From"
                token={token0}
                onClick={() => {
                  setActiveField('token0');
                  toggleSelectToken();
                }}
              />
              <FormInput label="Amount" />
            </Flex>
            <Flex sx={{ flexDirection: 'column', marginLeft: '8px' }}>
              <TokenPickerInput
                sx={{ width: '100%', marginBottom: 16, textOverflow: 'ellipsis' }}
                label="To"
                token={token1}
                onClick={() => {
                  setActiveField('token1');
                  toggleSelectToken();
                }}
              />
              <FormInput label="Amount" disabled={!!!token1} />
            </Flex>
          </Flex>
          <Button disabled sx={{ marginY: 24 }}>
            Swap
          </Button>
        </>
      );
    }
    return (
      <>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
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
      </>
    );
  }, [handleResetInput, isUpToExtraSmall, toggleSelectToken, token0, token1]);

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
        <Flex sx={{ flexDirection: 'column', width: 512, maxWidth: '100vw' }}>
          {isUpToExtraSmall ? (
            <>
              <Heading as="h3" variant="styles.h3" sx={{ marginTop: 32, marginBottom: 12, marginX: 16, fontSize: 3 }}>
                Swap
              </Heading>
            </>
          ) : (
            <Heading as="h3" variant="styles.h3" sx={{ marginTop: 32, marginBottom: 12, marginX: 16 }}>
              Swap
            </Heading>
          )}
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
      <SelectTokenModal active={activeSelectToken} title="Select token" onClose={handleCloseModal} />
    </>
  );
}
