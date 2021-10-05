import { Button, Flex, Heading } from '@theme-ui/components';
import { useCallback } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import TokenPickerInput from '../../../components/forms/token-picker.input';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import { utils } from '../../../constants/token';
import { useAppContext } from '../../../context';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import usePairRoute from '../../../hooks/usePairRoute';
import { actions } from '../../../reducers';
import { useAppDispatch } from '../../../reducers/hooks';
import routes from '../../../routes';

export default function ImportLiquidityPage() {
  const { account } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const { toggleConnectWallet } = useAppContext();
  const history = useHistory();

  const {
    disabledCurrency,
    isSelectingCurrency,
    toggleSelectCurrencyA,
    toggleSelectCurrencyB,
    onSelectCurrency,
    currencies: { CURRENCY_A: currencyA, CURRENCY_B: currencyB },
  } = usePairRoute(['address0', 'address1']);

  const importPair = useCallback(() => {
    if (!currencyA || !currencyB) return;
    dispatch(
      actions.token.addSerializedPair({
        serializedPair: {
          token0: utils.toSerializedToken(currencyA.isNative ? currencyA.wrapped : currencyA),
          token1: utils.toSerializedToken(currencyB.isNative ? currencyB.wrapped : currencyB),
        },
      }),
    );
    history.push(routes.pool);
  }, [currencyA, currencyB, dispatch, history]);

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
            token={currencyA}
            onClick={toggleSelectCurrencyA}
          />
          <TokenPickerInput
            sx={{
              width: '100%',
            }}
            label="Token 2"
            token={currencyB}
            onClick={toggleSelectCurrencyB}
          />
        </Flex>

        <Button
          disabled={!currencyA || !currencyB}
          onClick={() => {
            if (!account) toggleConnectWallet();
            else importPair();
          }}
        >
          {!!account ? 'Import' : 'Connect to wallet'}
        </Button>
      </>
    );
  }, [account, currencyA, currencyB, importPair, toggleConnectWallet, toggleSelectCurrencyA, toggleSelectCurrencyB]);

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
              backgroundColor: 'dark.500',
              borderRadius: 'lg',
              boxShadow: 'card',
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
        active={isSelectingCurrency}
        title="Select token"
        disabledToken={disabledCurrency}
        onClose={onSelectCurrency}
      />
    </>
  );
}
