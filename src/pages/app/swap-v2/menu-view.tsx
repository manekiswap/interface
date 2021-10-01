import { Button, Divider, Flex, FlexProps, Heading, Text } from '@theme-ui/components';

import CurrencyPickerInput from '../../../components/forms/currency-picker.input';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import usePairRoute from '../../../hooks/usePairRoute';
import routes from '../../../routes';

interface Props extends Omit<FlexProps, 'sx'> {
  a?: boolean;
}

export default function MenuView(props: Props) {
  const { className } = props;

  const {
    disabledCurrency,
    isSelectingCurrency,
    toggleSelectCurrencyA,
    toggleSelectCurrencyB,
    onSelectCurrency,
    currencies: { CURRENCY_A: currencyA, CURRENCY_B: currencyB },
  } = usePairRoute(routes.swapV2, ['from', 'to']);

  return (
    <>
      <Flex className={className} sx={{ padding: 28, backgroundColor: '#1D1D2D', flexDirection: 'column' }}>
        <Heading as="h3" variant="styles.h3" sx={{ marginBottom: 16 }}>
          Swap
        </Heading>

        <CurrencyPickerInput
          sx={{ width: '100%', marginBottom: 24 }}
          label="From"
          currency={currencyA}
          onClick={toggleSelectCurrencyA}
        />
        <CurrencyPickerInput
          sx={{ width: '100%', marginBottom: 24 }}
          label="To"
          currency={currencyB}
          onClick={toggleSelectCurrencyB}
        />
        <Button variant="buttons.primary">Ready to Swap</Button>

        <Divider sx={{ marginY: 24 }} />
        <Text>General Info</Text>
        <Text>Momentum</Text>
        <Text>Exchange inflow / outflow</Text>
        <Text>Decentralized exchanges (total volume)</Text>
        <Text>Ownership</Text>
        <Text>Supply on exchanges with % of total supply</Text>
        <Text>Supply held by top addresses with % of total supply</Text>
        <Text>Fundamental</Text>
        <Text>Development activity</Text>
        <Text>Social dominance</Text>
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
