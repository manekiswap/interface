import { Currency } from '@manekiswap/sdk';
import { Button, Divider, Flex, FlexProps, Heading, IconButton, Text } from '@theme-ui/components';
import { ThemeUIStyleObject } from '@theme-ui/css';
import { FiInfo } from 'react-icons/fi';
import { useHistory } from 'react-router';

import SwapSVG from '../../../assets/images/icons/swap.svg';
import TokenPickerInput from '../../../components/forms/token-picker.input';
import Link from '../../../components/links/link';
import Tooltip from '../../../components/tooltips/tooltip';
import { mediaWidthTemplates } from '../../../constants/media';
import useHashScroll from '../../../hooks/useHashScroll';
import routes, { buildRoute } from '../../../routes';
import getAddress from '../../../utils/getAddress';
import getMetric, { distributionMetrics, financialMetrics, fundamentalMetrics, signalMetrics } from './metrics';

interface Props extends Omit<FlexProps, 'sx'> {
  pair: {
    from: Currency | undefined;
    to: Currency | undefined;
  };
  toggleSelectCurrencyA: () => void;
  toggleSelectCurrencyB: () => void;
}

const hashPaths = {
  ['#general']: { anchor: 'generalAnchor', offset: -108 },
  ['#distribution']: { anchor: 'distributionAnchor', offset: -168 },
  ['#fundamental']: { anchor: 'fundamentalAnchor', offset: -168 },
  ['#financial']: { anchor: 'financialAnchor', offset: -168 },
  ['#signal']: { anchor: 'signalAnchor', offset: -168 },
};

const InfoIcon = () => <FiInfo sx={{ height: 13, width: 13, cursor: 'pointer', color: 'dark.200' }} />;

const itemStyle: ThemeUIStyleObject = {
  justifyContent: 'flex-start',
  backgroundColor: 'transparent',
  textDecoration: 'none',
  color: 'white.300',
  height: 'unset',
  paddingX: '8px',
  marginX: 16,
  '&:hover': { backgroundColor: 'white.100' },
  '&:focus': { boxShadow: 'none' },
};

export default function MenuView(props: Props) {
  const { className, pair, toggleSelectCurrencyA, toggleSelectCurrencyB } = props;

  const history = useHistory();
  const { scroll, hash, toPath } = useHashScroll((hash: string) => hashPaths[hash], false);

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
          backgroundColor: 'dark.500',
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
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '2px',
              background: 'linear-gradient(74.33deg, #6966F8 1.16%, #C853E2 110.81%)',
            },
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
              paddingY: '12px',
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

          <Flex
            sx={{
              flexDirection: 'column',
              position: 'relative',
              ...mediaWidthTemplates.upToMedium({ flexDirection: 'row' }),
            }}
          >
            <TokenPickerInput
              sx={{
                width: '100%',
                marginBottom: 16,
                marginRight: 0,
                border: '1px solid #3C3F5A',
                ...mediaWidthTemplates.upToMedium({ marginBottom: 0, marginRight: 20 }),
              }}
              label="From"
              currency={pair.from}
              onClick={toggleSelectCurrencyA}
            />
            <TokenPickerInput
              sx={{
                width: '100%',
                border: '1px solid #3C3F5A',
              }}
              label="To"
              currency={pair.to}
              onClick={toggleSelectCurrencyB}
              autoFocus
            />
            <IconButton
              sx={{
                display: 'none',
                height: 28,
                width: 28,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'dark.500',
                borderRadius: 'circle',
                position: 'absolute',
                top: `calc(50% - 14px)`,
                left: `calc(50% - 14px)`,
                '> svg': {
                  color: 'mint.300',
                  transform: 'rotate(90deg)',
                  height: 16,
                  width: 16,
                },
                ...mediaWidthTemplates.upToExtraSmall({
                  display: 'flex',
                  '> svg': {
                    transform: 'rotate(0deg)',
                  },
                }),
              }}
              onClick={() => {
                history.push(
                  buildRoute(
                    {
                      from: getAddress(pair.to),
                      to: getAddress(pair.from),
                    },
                    { path: routes.swap },
                  ),
                );
              }}
            >
              <SwapSVG />
            </IconButton>
          </Flex>
          {pair.from && pair.to && (
            <Button
              variant="gradient"
              sx={{ marginTop: 16, ...mediaWidthTemplates.upToMedium({ marginTop: 10 }) }}
              onClick={() => {
                history.push(
                  buildRoute(
                    { from: getAddress(pair.from), to: getAddress(pair.to), fromRoute: routes.swap },
                    { path: routes.swapNext },
                  ),
                );
              }}
            >
              Ready to Swap
            </Button>
          )}
        </Flex>

        <Divider
          sx={{
            borderColor: '#364051',
            ...mediaWidthTemplates.upToMedium({ display: 'none' }),
          }}
        />

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
            sx={itemStyle}
            to={toPath('#distribution')}
            onClick={(e) => {
              scroll('#distribution');
            }}
          >
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', paddingY: '8px' }}>
              <Flex sx={{ alignItems: 'center' }}>
                <Text
                  variant="text.caps"
                  sx={{
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'velvet.300',
                    marginBottom: '4px',
                    marginRight: '4px',
                  }}
                >
                  Distribution
                </Text>
              </Flex>
              {distributionMetrics.map((metric, i) => {
                return (
                  <Flex key={metric} sx={{ alignItems: 'center', marginBottom: i === 0 ? '4px' : 0 }}>
                    <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>{getMetric(metric).title}</Text>
                    <Tooltip sx={{ marginLeft: 10 }} title={getMetric(metric).description} position="bottom">
                      <InfoIcon />
                    </Tooltip>
                  </Flex>
                );
              })}
            </Flex>
          </Link>

          <Link
            variant="styles.button"
            sx={itemStyle}
            to={toPath('#fundamental')}
            onClick={(e) => {
              scroll('#fundamental');
            }}
          >
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', paddingY: '8px' }}>
              <Flex sx={{ alignItems: 'center' }}>
                <Text
                  variant="text.caps"
                  sx={{
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'velvet.300',
                    marginBottom: '4px',
                    marginRight: '4px',
                  }}
                >
                  Fundamental
                </Text>
              </Flex>
              {fundamentalMetrics.map((metric, i) => {
                return (
                  <Flex key={metric} sx={{ alignItems: 'center', marginBottom: i === 0 ? '4px' : 0 }}>
                    <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>{getMetric(metric).title}</Text>
                    <Tooltip sx={{ marginLeft: 10 }} title={getMetric(metric).description} position="bottom">
                      <InfoIcon />
                    </Tooltip>
                  </Flex>
                );
              })}
            </Flex>
          </Link>

          <Link
            variant="styles.button"
            sx={itemStyle}
            to={toPath('#financial')}
            onClick={(e) => {
              scroll('#financial');
            }}
          >
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', paddingY: '8px' }}>
              <Flex sx={{ lignItems: 'center' }}>
                <Text
                  variant="text.caps"
                  sx={{
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'velvet.300',
                    marginBottom: '4px',
                    marginRight: '4px',
                  }}
                >
                  Financial
                </Text>
              </Flex>
              {financialMetrics.map((metric, i) => {
                return (
                  <Flex key={metric} sx={{ alignItems: 'center', marginBottom: i === 0 ? '4px' : 0 }}>
                    <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>{getMetric(metric).title}</Text>
                    <Tooltip sx={{ marginLeft: 10 }} title={getMetric(metric).description} position="bottom">
                      <InfoIcon />
                    </Tooltip>
                  </Flex>
                );
              })}
            </Flex>
          </Link>

          <Link
            variant="styles.button"
            sx={itemStyle}
            to={toPath('#signal')}
            onClick={(e) => {
              scroll('#signal');
            }}
          >
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', paddingY: '8px' }}>
              <Flex sx={{ lignItems: 'center' }}>
                <Text
                  variant="text.caps"
                  sx={{
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'velvet.300',
                    marginBottom: '4px',
                    marginRight: '4px',
                  }}
                >
                  Signal
                </Text>
              </Flex>
              {signalMetrics.map((metric, i) => {
                return (
                  <Flex key={metric} sx={{ alignItems: 'center', marginBottom: i === 0 ? '4px' : 0 }}>
                    <Text sx={{ fontSize: 0, lineHeight: 0, color: 'dark.200' }}>{getMetric(metric).title}</Text>
                    <Tooltip sx={{ marginLeft: 10 }} title={getMetric(metric).description} position="bottom">
                      <InfoIcon />
                    </Tooltip>
                  </Flex>
                );
              })}
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
