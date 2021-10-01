import { Button, Divider, Flex, FlexProps, Heading, Text } from '@theme-ui/components';
import { ThemeUIStyleObject } from '@theme-ui/css';
import { useCallback } from 'react';

import CurrencyPickerInput from '../../../components/forms/currency-picker.input';
import Link from '../../../components/links/link';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import useHashScroll from '../../../hooks/useHashScroll';
import usePairRoute from '../../../hooks/usePairRoute';
import routes from '../../../routes';

interface Props extends Omit<FlexProps, 'sx'> {
  a?: boolean;
}

const hashPaths = {
  [`${routes.swapV2}#general`]: 'generalAnchor',
  [`${routes.swapV2}#momentum`]: 'momentumAnchor',
  [`${routes.swapV2}#ownership`]: 'ownershipAnchor',
  [`${routes.swapV2}#fundamental`]: 'fundamentalAnchor',
};

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

  const { scroll, hash } = useHashScroll((path: string) => hashPaths[`${routes.swapV2}${path}`], -96);

  const getSectionStyle = useCallback((active: boolean) => {
    return {
      textDecoration: 'none',
      color: 'white.300',
      height: 'unset',
      justifyContent: 'flex-start',
      backgroundColor: active ? '#29293E' : 'transparent',
      padding: 12,
      marginY: '4px',
      '&:hover': { backgroundColor: 'white.100' },
      '&:focus': { boxShadow: 'outline' },
    } as ThemeUIStyleObject;
  }, []);

  return (
    <>
      <Flex
        className={className}
        sx={{
          padding: 28,
          backgroundColor: '#1D1D2D',
          flexDirection: 'column',
          position: 'fixed',
          top: 80,
          left: 0,
          bottom: 0,
          overscrollBehaviorY: 'contain',
          overflow: 'auto',
        }}
      >
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
        <Link
          variant="styles.button"
          sx={getSectionStyle(hash === '#general')}
          to={`${routes.swapV2}#general`}
          onClick={(e) => {
            scroll(hashPaths[`${routes.swapV2}#general`]);
          }}
        >
          General Info
        </Link>

        <Link
          variant="styles.button"
          sx={getSectionStyle(hash === '#momentum')}
          to={`${routes.swapV2}#momentum`}
          onClick={(e) => {
            scroll(hashPaths[`${routes.swapV2}#momentum`]);
          }}
        >
          <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text sx={{ marginBottom: 12 }}>Momentum</Text>
            <Text sx={{ fontSize: 0, marginBottom: 16 }}>Exchange inflow / outflow</Text>
            <Text sx={{ fontSize: 0 }}>Decentralized exchanges (total volume)</Text>
          </Flex>
        </Link>

        <Link
          variant="styles.button"
          sx={getSectionStyle(hash === '#ownership')}
          to={`${routes.swapV2}#ownership`}
          onClick={(e) => {
            scroll(hashPaths[`${routes.swapV2}#ownership`]);
          }}
        >
          <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text sx={{ marginBottom: 12 }}>Ownership</Text>
            <Text sx={{ fontSize: 0, marginBottom: 16 }}>Supply on exchanges with % of total supply</Text>
            <Text sx={{ fontSize: 0 }}>Supply held by top addresses with % of total supply</Text>
          </Flex>
        </Link>

        <Link
          variant="styles.button"
          sx={getSectionStyle(hash === '#fundamental')}
          to={`${routes.swapV2}#fundamental`}
          onClick={(e) => {
            scroll(hashPaths[`${routes.swapV2}#fundamental`]);
          }}
        >
          <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text sx={{ marginBottom: 12 }}>Fundamental</Text>
            <Text sx={{ fontSize: 0, marginBottom: 16 }}>Development activity</Text>
            <Text sx={{ fontSize: 0 }}>Social dominance</Text>
          </Flex>
        </Link>
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
