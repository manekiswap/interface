import { Currency } from '@manekiswap/sdk';
import { Button, Divider, Flex, FlexProps, Heading, Text } from '@theme-ui/components';
import { ThemeUIStyleObject } from '@theme-ui/css';
import { useCallback, useEffect } from 'react';
import { FiInfo } from 'react-icons/fi';
import { useHistory } from 'react-router';

import TokenPickerInput from '../../../components/forms/token-picker.input';
import Link from '../../../components/links/link';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import Tooltip from '../../../components/tooltips/tooltip';
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

const InfoIcon = () => <FiInfo sx={{ height: 13, width: 13, cursor: 'pointer', color: 'dark.200' }} />;

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
          overflow: 'auto',
          backgroundColor: 'dark.400',
          borderRight: '1px solid #3C3F5A',
          ...mediaWidthTemplates.upToMedium({
            position: 'fixed',
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            height: 'unset',
            width: '100%',
            border: 'none',
            zIndex: 2,
          }),
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            width: 420,
            alignSelf: 'flex-end',
            padding: 28,
            ...mediaWidthTemplates.upToMedium({
              paddingX: 16,
              paddingY: '8px',
              width: 'unset',
              alignSelf: 'unset',
            }),
          }}
        >
          <Heading
            variant="styles.h4"
            sx={{ marginBottom: 16, ...mediaWidthTemplates.upToMedium({ display: 'none' }) }}
          >
            Swap
          </Heading>

          <Flex sx={{ flexDirection: 'column', ...mediaWidthTemplates.upToMedium({ flexDirection: 'row' }) }}>
            <TokenPickerInput
              sx={{
                width: '100%',
                marginBottom: 24,
                marginRight: 0,
                backgroundColor: 'transparent',
                border: '1px solid #3C3F5A',
                ...mediaWidthTemplates.upToMedium({ marginBottom: 0, marginRight: 20 }),
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
              sx={{ marginTop: 24, ...mediaWidthTemplates.upToMedium({ marginTop: 10 }) }}
              onClick={() => {
                history.push(buildSwapRoute({ from: getAddress(currencyA), to: getAddress(currencyB) }));
              }}
            >
              Ready to Swap
            </Button>
          )}
        </Flex>

        <Divider sx={{ backgroundColor: '#3C3F5A', ...mediaWidthTemplates.upToMedium({ display: 'none' }) }} />

        <Flex
          sx={{
            flexDirection: 'column',
            width: 420,
            alignSelf: 'flex-end',
            padding: 28,
            ...mediaWidthTemplates.upToMedium({ display: 'none' }),
          }}
        >
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
              <Flex sx={{ alignItems: 'center', marginBottom: '4px' }}>
                <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>Exchange inflow / outflow</Text>
                <Tooltip
                  sx={{ marginLeft: 10 }}
                  title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nulla."
                  position="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <Flex sx={{ alignItems: 'center' }}>
                <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>
                  Decentralized exchanges (total volume)
                </Text>
                <Tooltip
                  sx={{ marginLeft: 10 }}
                  title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nulla."
                  position="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Flex>
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
              <Flex sx={{ alignItems: 'center', marginBottom: '4px' }}>
                <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>
                  Supply on exchanges with % of total supply
                </Text>
                <Tooltip
                  sx={{ marginLeft: 10 }}
                  title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nulla."
                  position="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <Flex sx={{ alignItems: 'center' }}>
                <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>
                  Supply held by top addresses with % of total supply
                </Text>
                <Tooltip
                  sx={{ marginLeft: 10 }}
                  title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nulla."
                  position="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Flex>
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
              <Flex sx={{ alignItems: 'center', marginBottom: '4px' }}>
                <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>Development activity</Text>
                <Tooltip
                  sx={{ marginLeft: 10 }}
                  title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nulla."
                  position="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <Flex sx={{ alignItems: 'center' }}>
                <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>Social dominance</Text>
                <Tooltip
                  sx={{ marginLeft: 10 }}
                  title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nulla."
                  position="bottom"
                >
                  <InfoIcon />
                </Tooltip>
              </Flex>
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
