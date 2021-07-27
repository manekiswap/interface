import { Modal, ModalContent, ModalTitle } from '@mattjennings/react-modal';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Heading, Switch, Text } from 'theme-ui';

import useUserConfig from '../../hooks/useUserConfig';
import { useWindowSize } from '../../hooks/useWindowSize';
import { actions } from '../../reducers';
import FormInput from '../forms/form.input';
import Toggle from '../toggle/toggle';

interface Props {
  active: boolean;
  onClose: () => void;
}

export default function TransactionSettingsModal(props: Props) {
  const { active, onClose } = props;
  const { width = 0 } = useWindowSize();
  const dispatch = useDispatch();

  const { multihop, slippage } = useUserConfig();
  console.log(multihop, slippage);

  const _onClose = () => {
    onClose();
  };

  const _onChangeSlippage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isNaN(Number(e.target.value))) return;
      dispatch(actions.user.changeSlippage(Number(e.target.value)));
    },
    [dispatch],
  );

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={false}
      fullScreen={false}
      onClose={() => _onClose()}
      open={active}
      width={Math.min(448, width - 32)}
    >
      <ModalTitle>
        <Heading as="h5" variant="styles.h5">
          Transaction settings
        </Heading>
      </ModalTitle>

      <ModalContent sx={{ flexDirection: 'column' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Text sx={{ color: 'subtitle', marginBottom: '8px' }}>Slippage tolerance</Text>
          <Flex sx={{ alignItems: 'center' }}>
            <Toggle
              active={slippage === 'auto'}
              label={'Auto'}
              onToggle={(value: boolean) => {
                if (value) dispatch(actions.user.changeSlippage('auto'));
                else dispatch(actions.user.changeSlippage(0.1));
              }}
            />
            <FormInput
              disabled={slippage === 'auto'}
              sx={{
                flex: 1,
                marginLeft: 12,
                fontFamily: 'body',
                '.input-wrapper::after': {
                  content: '"%"',
                },
              }}
              onChange={_onChangeSlippage}
            />
          </Flex>
        </Flex>
        <Flex sx={{ marginTop: 24, flexDirection: 'column' }}>
          <Text sx={{ color: 'subtitle', marginBottom: '8px' }}>Transaction deadline</Text>
          <FormInput
            sx={{
              fontFamily: 'body',
              '.input-wrapper::after': {
                content: '"min"',
              },
            }}
          />
        </Flex>
        <Flex
          sx={{
            marginTop: 24,
            alignItems: 'center',
            justifyContent: 'space-between',
            '& label': {
              width: 'initial',
            },
          }}
        >
          <Text sx={{ color: 'subtitle' }}>Multihops</Text>
          <Switch
            defaultChecked={multihop}
            onChange={({ target }) => {
              dispatch(actions.user.toggleMultihop(target.checked));
            }}
          />
        </Flex>
      </ModalContent>
    </Modal>
  );
}
