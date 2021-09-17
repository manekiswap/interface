import { Modal, ModalContent, ModalTitle } from '@mattjennings/react-modal';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Flex, Heading, Switch, Text } from 'theme-ui';

import { useMediaQueryMaxWidth } from '../../hooks/useMediaQuery';
import useUserConfig from '../../hooks/useUserConfig';
import { useWindowSize } from '../../hooks/useWindowSize';
import { actions } from '../../reducers';
import { useAppDispatch } from '../../reducers/hooks';
import ControlledInput from '../forms/controlled.input';
import FormInput from '../forms/form.input';
import Toggle from '../toggles/toggle';

interface Props {
  active: boolean;
  onClose: () => void;
}

export default function TransactionSettingsModal(props: Props) {
  const { active, onClose } = props;
  const { width = 0 } = useWindowSize();
  const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');

  const dispatch = useAppDispatch();

  const slippageInputRef = useRef<typeof FormInput>();

  const { multihop, slippage, transactionDeadline } = useUserConfig();

  const [localMultiHop, setLocalMultihop] = useState(multihop);
  const [localSlippage, setLocalSlippage] = useState(slippage === 'auto' ? '' : `${slippage}`);
  const [localTransactionDeadline, setLocalTransactionDeadline] = useState(`${transactionDeadline}`);

  const _onClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!active) {
      dispatch(actions.user.toggleMultihop(localMultiHop));
      dispatch(actions.user.changeSlippage(localSlippage === '' ? 'auto' : Number(localSlippage)));
      dispatch(actions.user.changeTransactionDeadline(Number(localTransactionDeadline)));
    }
  }, [active, dispatch, localMultiHop, localSlippage, localTransactionDeadline]);

  const _onChangeSlippage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setLocalSlippage(e.target.value);
    }
  }, []);

  const _onChangeTransactionDeadline = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setLocalTransactionDeadline(e.target.value);
    }
  }, []);

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
        <Heading as="h5" variant={isUpToExtraSmall ? 'styles.h6' : 'styles.h5'}>
          Transaction settings
        </Heading>
      </ModalTitle>

      <ModalContent sx={{ flexDirection: 'column' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Text sx={{ color: 'subtitle', marginBottom: '8px' }}>Slippage tolerance</Text>
          <Flex sx={{ alignItems: 'center' }}>
            <Toggle
              active={localSlippage === ''}
              label={'Auto'}
              onToggle={(value: boolean) => {
                if (value) {
                  setLocalSlippage('');
                  (slippageInputRef.current as any).changeValue('');
                } else {
                  setLocalSlippage('0.1');
                  (slippageInputRef.current as any).changeValue('0.1');
                }
              }}
            />
            <ControlledInput
              ref={slippageInputRef}
              disabled={localSlippage === ''}
              sx={{
                flex: 1,
                marginLeft: 12,
                fontFamily: 'body',
                '.input-wrapper::after': {
                  content: '"%"',
                },
              }}
              defaultValue={slippage === 'auto' ? '' : `${slippage}`}
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
            defaultValue={transactionDeadline / 60}
            onChange={_onChangeTransactionDeadline}
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
              setLocalMultihop(target.checked);
            }}
          />
        </Flex>
      </ModalContent>
    </Modal>
  );
}
