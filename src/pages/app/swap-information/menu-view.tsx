import { Currency } from '@manekiswap/sdk';
import { Button, Divider, Flex, FlexProps, Heading, Text } from '@theme-ui/components';
import { ThemeUIStyleObject } from '@theme-ui/css';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import TokenPickerInput from '../../../components/forms/token-picker.input';
import Link from '../../../components/links/link';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import useHashScroll from '../../../hooks/useHashScroll';
import usePairRoute from '../../../hooks/usePairRoute';
import { buildSwapRoute } from '../../../routes';
import getAddress from '../../../utils/getAddress';

interface Props extends Omit<FlexProps, 'sx'> {
  onPickPair: (payload: { from: Currency | undefined; to: Currency | undefined }) => void;
}

const hashPaths = {
  ['#general']: { anchor: 'generalAnchor', offset: -108 },
  ['#momentum']: { anchor: 'momentumAnchor', offset: -168 },
  ['#ownership']: { anchor: 'ownershipAnchor', offset: -168 },
  ['#fundamental']: { anchor: 'fundamentalAnchor', offset: -168 },
};

export default function MenuView(props: Props) {
  const { className, onPickPair } = props;

  const history = useHistory();

  const {
    disabledCurrency,
    isSelectingCurrency,
    toggleSelectCurrencyA,
    toggleSelectCurrencyB,
    onSelectCurrency,
    currencies: { CURRENCY_A: currencyA, CURRENCY_B: currencyB },
  } = usePairRoute(['from', 'to']);

  const { scroll, hash, toPath } = useHashScroll((hash: string) => hashPaths[hash], false);

  useEffect(() => {
    onPickPair({ from: currencyA, to: currencyB });
  }, [currencyA, currencyB, onPickPair]);

  const getItemStyle = useCallback(() => {
    return {
      justifyContent: 'flex-start',
      backgroundColor: 'transparent',
      textDecoration: 'none',
      color: 'white.300',
      height: 'unset',
      paddingX: '8px',
      marginX: 16,
      '&:hover': { backgroundColor: 'white.100' },
      '&:focus': { boxShadow: 'none' },
    } as ThemeUIStyleObject;
  }, []);

  return (
    <>
      <Flex
        className={className}
        sx={{
          flexDirection: 'column',
          position: 'sticky',
          height: 'calc(100vh - 80px)',
          top: 80,
          backgroundColor: 'dark.400',
          borderRight: '1px solid #3C3F5A',
          ...mediaWidthTemplates.upToSmall({
            position: 'fixed',
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            height: 'unset',
            width: '100%',
            border: 'none',
          }),
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            padding: 28,
            ...mediaWidthTemplates.upToSmall({ paddingX: 16, paddingY: '8px' }),
          }}
        >
          <Heading variant="styles.h4" sx={{ marginBottom: 16, ...mediaWidthTemplates.upToSmall({ display: 'none' }) }}>
            Swap
          </Heading>

          <Flex sx={{ flexDirection: 'column', ...mediaWidthTemplates.upToSmall({ flexDirection: 'row' }) }}>
            <TokenPickerInput
              sx={{
                width: '100%',
                marginBottom: 24,
                marginRight: 0,
                backgroundColor: 'transparent',
                border: '1px solid #3C3F5A',
                ...mediaWidthTemplates.upToSmall({ marginBottom: 0, marginRight: 20 }),
              }}
              label="From"
              currency={currencyA}
              onClick={toggleSelectCurrencyA}
            />
            <TokenPickerInput
              sx={{
                width: '100%',
                backgroundColor: 'transparent',
                border: '1px solid #3C3F5A',
              }}
              label="To"
              currency={currencyB}
              onClick={toggleSelectCurrencyB}
            />
          </Flex>
          {currencyA && currencyB && (
            <Button
              variant="buttons.primary"
              sx={{ marginTop: 24, ...mediaWidthTemplates.upToSmall({ marginTop: 10 }) }}
              onClick={() => {
                history.push(buildSwapRoute({ from: getAddress(currencyA), to: getAddress(currencyB) }));
              }}
            >
              Ready to Swap
            </Button>
          )}
        </Flex>

        <Divider sx={{ backgroundColor: '#3C3F5A', ...mediaWidthTemplates.upToSmall({ display: 'none' }) }} />
        <Flex sx={{ flexDirection: 'column', padding: 28, ...mediaWidthTemplates.upToSmall({ display: 'none' }) }}>
          <Link
            variant="styles.button"
            sx={{
              justifyContent: 'flex-start',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              color: 'dark.100',
              height: 40,
              paddingX: '8px',
              '&:hover': { backgroundColor: 'white.100' },
              '&:focus': { boxShadow: 'none' },
            }}
            to={toPath('#general')}
            onClick={(e) => {
              scroll('#general');
            }}
          >
            General Info
          </Link>

          <Flex
            sx={{
              height: 40,
              paddingX: '8px',
              alignItems: 'center',
            }}
          >
            <Text sx={{ color: 'dark.100', fontWeight: 'bold' }}>Recommendation</Text>
          </Flex>

          <Link
            variant="styles.button"
            sx={getItemStyle()}
            to={toPath('#momentum')}
            onClick={(e) => {
              scroll('#momentum');
            }}
          >
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', paddingY: '8px' }}>
              <Flex sx={{ alignItems: 'center' }}>
                <Text
                  variant="text.caps"
                  sx={{
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'blue.300',
                    marginBottom: '4px',
                    marginRight: '4px',
                  }}
                >
                  Momentum
                </Text>
              </Flex>
              <Text sx={{ fontSize: 0, lineHeight: 0, marginBottom: '4px', color: 'dark.200' }}>
                Exchange inflow / outflow
              </Text>
              <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>Decentralized exchanges (total volume)</Text>
            </Flex>
          </Link>

          <Link
            variant="styles.button"
            sx={getItemStyle()}
            to={toPath('#ownership')}
            onClick={(e) => {
              scroll('#ownership');
            }}
          >
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', paddingY: '8px' }}>
              <Flex sx={{ alignItems: 'center' }}>
                <Text
                  variant="text.caps"
                  sx={{
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'blue.300',
                    marginBottom: '4px',
                    marginRight: '4px',
                  }}
                >
                  Ownership
                </Text>
              </Flex>
              <Text sx={{ fontSize: 0, lineHeight: 0, marginBottom: '4px', color: 'dark.200' }}>
                Supply on exchanges with % of total supply
              </Text>
              <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>
                Supply held by top addresses with % of total supply
              </Text>
            </Flex>
          </Link>

          <Link
            variant="styles.button"
            sx={getItemStyle()}
            to={toPath('#fundamental')}
            onClick={(e) => {
              scroll('#fundamental');
            }}
          >
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', paddingY: '8px' }}>
              <Flex sx={{ lignItems: 'center' }}>
                <Text
                  variant="text.caps"
                  sx={{
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'blue.300',
                    marginBottom: '4px',
                    marginRight: '4px',
                  }}
                >
                  Fundamental
                </Text>
              </Flex>
              <Text sx={{ fontSize: 0, lineHeight: 0, marginBottom: '4px', color: 'dark.200' }}>
                Development activity
              </Text>
              <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>Social dominance</Text>
            </Flex>
          </Link>
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
