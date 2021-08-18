import { useCallback, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { Button, Flex, Heading, Text } from 'theme-ui';

import FormInput from '../../../components/forms/form.input';
import TokenPickerInput from '../../../components/forms/token-picker.input';
import TokenLogo from '../../../components/logos/token.logo';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import TransactionSettingsModal from '../../../components/modals/transaction-settings.modal';
import FeePicker from '../../../components/pickers/fee.picker';
import PriceSlider from '../../../components/sliders/price.slider';
import { mediaWidthTemplates } from '../../../constants/media';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';
import usePoolPair from '../../../hooks/usePoolPair';
import useToggle from '../../../hooks/useToggle';
import { ShortToken } from '../../../reducers/swap/types';

type InputField = 'token0' | 'token1';

export default function RemoveLiquidityPage() {
  // const [activeSelectToken, toggleSelectToken] = useToggle(false);
  // const [activeTransactionSettings, toggleTransactionSettings] = useToggle(false);

  // const [activeField, setActiveField] = useState<InputField | undefined>(undefined);

  // const isUpToExtraSmall = useMediaQueryMaxWidth('upToExtraSmall');
  // const { token0, token1, updateToken0, updateToken1, reset } = usePoolPair();

  // const _onCloseSelectTokenModal = useCallback(
  //   (token: ShortToken | undefined) => {
  //     if (!!activeField && !!token) {
  //       if (token0?.address === token.address && activeField === 'token1') return;
  //       if (token1?.address === token.address && activeField === 'token0') return;

  //       if (activeField === 'token0') updateToken0(token);
  //       else if (activeField === 'token1') updateToken1(token);
  //     }
  //     toggleSelectToken();
  //   },
  //   [activeField, toggleSelectToken, token0?.address, token1?.address, updateToken0, updateToken1],
  // );

  // const _onCloseTransactionSettingsModal = useCallback(() => {
  //   toggleTransactionSettings();
  // }, [toggleTransactionSettings]);

  return (
    <>
      <Flex></Flex>
      {/* <SelectTokenModal active={activeSelectToken} title="Select token" onClose={_onCloseSelectTokenModal} />
      <TransactionSettingsModal active={activeTransactionSettings} onClose={_onCloseTransactionSettingsModal} /> */}
    </>
  );
}
