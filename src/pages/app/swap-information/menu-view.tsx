import { Button, Divider, Flex, FlexProps, Heading, Text } from '@theme-ui/components';
import { ThemeUIStyleObject } from '@theme-ui/css';
import { useCallback, useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router';

import TokenPickerInput from '../../../components/forms/token-picker.input';
import Link from '../../../components/links/link';
import SelectTokenModal from '../../../components/modals/select-token.modal';
import useHashScroll from '../../../hooks/useHashScroll';
import usePairRoute from '../../../hooks/usePairRoute';
import { buildSwapRoute } from '../../../routes';
import getAddress from '../../../utils/getAddress';

interface Props extends Omit<FlexProps, 'sx'> {
  a?: boolean;
}

const hashPaths = {
  ['#general']: { anchor: 'generalAnchor', offset: -80 },
  ['#momentum']: { anchor: 'momentumAnchor', offset: -80 },
  ['#ownership']: { anchor: 'ownershipAnchor', offset: -80 },
  ['#fundamental']: { anchor: 'fundamentalAnchor', offset: -80 },
};

export default function MenuView(props: Props) {
  const { className } = props;

  const history = useHistory();
  const [showRecommendation, setShowRecommendation] = useState(false);

  const {
    disabledCurrency,
    isSelectingCurrency,
    toggleSelectCurrencyA,
    toggleSelectCurrencyB,
    onSelectCurrency,
    currencies: { CURRENCY_A: currencyA, CURRENCY_B: currencyB },
  } = usePairRoute(['from', 'to']);

  const { scroll, hash, toPath } = useHashScroll((hash: string) => hashPaths[hash]);

  const getSectionStyle = useCallback(() => {
    return {
      justifyContent: 'flex-start',
      backgroundColor: 'transparent',
      textDecoration: 'none',
      color: 'dark.100',
      height: 40,
      paddingX: '8px',
      '&:hover': { backgroundColor: 'white.100' },
      '&:focus': { boxShadow: 'none' },
    } as ThemeUIStyleObject;
  }, []);

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
          overscrollBehaviorY: 'contain',
          overflow: 'auto',
        }}
      >
        <Flex sx={{ flexDirection: 'column', padding: 28 }}>
          <Heading variant="styles.h3" sx={{ marginBottom: 16 }}>
            Swap
          </Heading>

          <TokenPickerInput
            sx={{ width: '100%', marginBottom: 24, backgroundColor: 'transparent', border: '1px solid #3C3F5A' }}
            label="From"
            currency={currencyA}
            onClick={toggleSelectCurrencyA}
          />
          <TokenPickerInput
            sx={{
              width: '100%',
              marginBottom: currencyA && currencyB ? 24 : 0,
              backgroundColor: 'transparent',
              border: '1px solid #3C3F5A',
            }}
            label="To"
            currency={currencyB}
            onClick={toggleSelectCurrencyB}
          />
          {currencyA && currencyB && (
            <Button
              variant="buttons.primary"
              onClick={() => {
                history.push(buildSwapRoute({ from: getAddress(currencyA), to: getAddress(currencyB) }));
              }}
            >
              Ready to Swap
            </Button>
          )}
        </Flex>

        <Divider sx={{ backgroundColor: '#3C3F5A' }} />
        <Flex sx={{ flexDirection: 'column', padding: 28 }}>
          <Link
            variant="styles.button"
            sx={getSectionStyle()}
            to={toPath('#general')}
            onClick={(e) => {
              scroll('#general');
            }}
          >
            General Info
          </Link>

          <Button
            variant="styles.button"
            sx={getSectionStyle()}
            onClick={(e) => {
              setShowRecommendation(true);
            }}
          >
            Recommendation
          </Button>

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
                    marginBottom: showRecommendation ? '4px' : 0,
                    marginRight: '4px',
                  }}
                >
                  Momentum
                </Text>
                {showRecommendation ? (
                  <FiChevronDown size={16} sx={{ color: 'blue.300' }} />
                ) : (
                  <FiChevronRight size={16} sx={{ color: 'blue.300' }} />
                )}
              </Flex>
              {showRecommendation && (
                <>
                  <Text sx={{ fontSize: 0, lineHeight: 0, marginBottom: '4px', color: 'dark.200' }}>
                    Exchange inflow / outflow
                  </Text>
                  <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>
                    Decentralized exchanges (total volume)
                  </Text>
                </>
              )}
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
                    marginBottom: showRecommendation ? '4px' : 0,
                    marginRight: '4px',
                  }}
                >
                  Ownership
                </Text>
                {showRecommendation ? (
                  <FiChevronDown size={16} sx={{ color: 'blue.300' }} />
                ) : (
                  <FiChevronRight size={16} sx={{ color: 'blue.300' }} />
                )}
              </Flex>
              {showRecommendation && (
                <>
                  <Text sx={{ fontSize: 0, lineHeight: 0, marginBottom: '4px', color: 'dark.200' }}>
                    Supply on exchanges with % of total supply
                  </Text>
                  <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>
                    Supply held by top addresses with % of total supply
                  </Text>
                </>
              )}
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
                    marginBottom: showRecommendation ? '4px' : 0,
                    marginRight: '4px',
                  }}
                >
                  Fundamental
                </Text>
                {showRecommendation ? (
                  <FiChevronDown size={16} sx={{ color: 'blue.300' }} />
                ) : (
                  <FiChevronRight size={16} sx={{ color: 'blue.300' }} />
                )}
              </Flex>
              {showRecommendation && (
                <>
                  <Text sx={{ fontSize: 0, lineHeight: 0, marginBottom: '4px', color: 'dark.200' }}>
                    Development activity
                  </Text>
                  <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>Social dominance</Text>
                </>
              )}
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
