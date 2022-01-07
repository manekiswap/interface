import { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Flex, Heading, Text } from 'theme-ui';

import HeaderButton from '../../../components/buttons/header.button';
import StrategyInvestModal from '../../../components/modals/strategy-invest.modal';
import { mediaWidthTemplates } from '../../../constants/media';
import useBreakPoint from '../../../hooks/useBreakPoint';
import useComponentSize from '../../../hooks/useComponentSize';
import useToggle from '../../../hooks/useToggle';
import routes from '../../../routes';
import { formattedPercent } from '../../../utils/numbers';
import Header from '../header';

type Strategy = {
  name: string;
  pair: string;
  fee: number;
  annualReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  weeklyROI: number;
  monthlyROI: number;
  lastUpdated: number;
  cummulativeROI: number[];
};

const strategies: Strategy[] = [
  {
    name: 'Bottom-to-bottom strategy',
    pair: 'MATICUSDT',
    fee: 0.01,
    annualReturn: 88.66,
    maxDrawdown: -17.43,
    sharpeRatio: 2.24,
    weeklyROI: 1.6,
    monthlyROI: 2.3,
    lastUpdated: Date.now(),
    cummulativeROI: [0.27, -0.43, 0.65, 1.03, 1.39, 1.21, 0.99, 1.57],
  },
  {
    name: 'Short term penny stock strategy',
    pair: 'MATICUSDT',
    fee: 0.01,
    annualReturn: 88.66,
    maxDrawdown: -17.43,
    sharpeRatio: 2.24,
    weeklyROI: 1.6,
    monthlyROI: 2.3,
    lastUpdated: Date.now(),
    cummulativeROI: [0.27, -0.43, 0.65, 1.03, 1.39, 1.21, 0.99, 1.57],
  },
  {
    name: 'Whale follow strategy',
    pair: 'MATICUSDT',
    fee: 0.01,
    annualReturn: 88.66,
    maxDrawdown: -17.43,
    sharpeRatio: 2.24,
    weeklyROI: 1.6,
    monthlyROI: 2.3,
    lastUpdated: Date.now(),
    cummulativeROI: [0.27, -0.43, 0.65, 1.03, 1.39, 1.21, 0.99, 1.57],
  },
  {
    name: 'Revenue momentum strategy',
    pair: 'MATICUSDT',
    fee: 0.01,
    annualReturn: 88.66,
    maxDrawdown: -17.43,
    sharpeRatio: 2.24,
    weeklyROI: 1.6,
    monthlyROI: 2.3,
    lastUpdated: Date.now(),
    cummulativeROI: [0.27, -0.43, 0.65, 1.03, 1.39, 1.21, 0.99, 1.57],
  },
];

const maxContentWidth = 1256;

export default function StrategyPage() {
  const navigate = useNavigate();
  const [active, toggle] = useToggle(false);
  const [activeStategy, setActiveStrategy] = useState<Strategy | undefined>();

  const {
    ref,
    dimensions: { width, height },
  } = useComponentSize<HTMLDivElement>();

  const { upToExtraSmall, upToSmall, upToMedium, upToLarge } = useBreakPoint(width);

  const options = useMemo<ApexOptions>(() => {
    return {
      chart: {
        type: 'line',
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: ['rgba(36, 124, 255, 1)'],
        width: 1,
        dashArray: 0,
      },
      tooltip: {
        enabled: false,
      },
    };
  }, []);

  const getColor = useCallback((value: number) => {
    if (value < 0) return 'red.200';
    else if (value > 0) return 'green.200';
    else return 'white.200';
  }, []);

  return (
    <>
      <Helmet>
        <title>Manekiswap | Product</title>
        <link rel="canonical" href="https://manekiswap.com/#/product" />
      </Helmet>

      <Flex
        sx={{
          flex: 1,
          background: '#0F0E44',
          paddingY: 100,
          ...mediaWidthTemplates.upToExtraLarge({
            paddingY: 0,
          }),
        }}
      >
        <Flex
          sx={{
            flex: 1,
            marginX: 'auto',
            maxWidth: 1440,
            flexDirection: 'column',
            background: '#151057',
          }}
        >
          <Header maxContentWidth={maxContentWidth - 32} />
          <Flex
            sx={{
              maxWidth: maxContentWidth,
              marginTop: 68,
              paddingX: 16,
              marginX: 'auto',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Button
              variant="buttons.link"
              sx={{
                alignSelf: 'flex-start',
                color: 'mint.300',
                marginBottom: 48,
              }}
              onClick={() => {
                navigate(routes.intelligence);
              }}
            >
              <FiArrowLeft sx={{ width: '24px !important', marginRight: '8px' }} />
              <Text
                sx={{
                  fontSize: 14,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 'regular',
                }}
              >
                Blockchain Intelligence
              </Text>
            </Button>
            <Heading
              variant="styles.h3"
              sx={{
                marginBottom: 24,
              }}
            >
              Trending Trading Signals
            </Heading>

            <Flex
              ref={ref}
              sx={{ flexDirection: 'column', backgroundColor: 'dark.500', borderRadius: 'lg', padding: 16 }}
            >
              <Flex sx={{ height: 20 }}>
                <Text sx={{ width: upToExtraSmall ? 180 : 256, fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>
                  Crypto/Strategy
                </Text>
                {!upToExtraSmall && <HeaderButton label="Annual return" direction={undefined} onClick={() => {}} />}
                {!upToExtraSmall && (
                  <HeaderButton label="Max Drawdown 30D" direction={undefined} sx={{ flex: 1.4 }} onClick={() => {}} />
                )}
                {!upToSmall && <HeaderButton label="Sharpe ratio" direction={undefined} onClick={() => {}} />}
                {!upToSmall && <HeaderButton label="Weekly ROI" direction={undefined} onClick={() => {}} />}
                {!upToSmall && <HeaderButton label="Monthly ROI" direction={undefined} onClick={() => {}} />}
                {!upToMedium && <HeaderButton label="Last updated" direction={undefined} onClick={() => {}} />}
                {!upToMedium && (
                  <HeaderButton
                    label="Cummulative ROI"
                    direction={undefined}
                    sx={{ maxWidth: 128 }}
                    onClick={() => {}}
                  />
                )}
              </Flex>
              {strategies.map((strategy, index) => {
                const {
                  name,
                  annualReturn,
                  maxDrawdown,
                  sharpeRatio,
                  weeklyROI,
                  monthlyROI,
                  lastUpdated,
                  cummulativeROI,
                } = strategy;
                return (
                  <Flex key={name} sx={{ flexDirection: 'column' }}>
                    <Flex sx={{ flex: 1, height: 48, alignItems: 'center' }}>
                      <Button
                        variant="styles.row"
                        sx={{
                          flex: 1,
                          padding: 0,
                          maxHeight: '100%',
                          '&:hover': { backgroundColor: 'transparent' },
                        }}
                        onClick={() => {
                          setActiveStrategy(strategy);
                          toggle();
                        }}
                      >
                        <Flex sx={{ height: '100%', width: '100%', alignItems: 'center' }}>
                          <Text
                            sx={{ width: upToExtraSmall ? 180 : 256, textAlign: 'left', color: 'white.400' }}
                          >{`${name}`}</Text>
                          {!upToExtraSmall && (
                            <Text
                              sx={{ flex: 1, textAlign: 'right', color: getColor(annualReturn) }}
                            >{`${formattedPercent(annualReturn)}`}</Text>
                          )}
                          {!upToExtraSmall && (
                            <Text
                              sx={{ flex: 1.4, textAlign: 'right', color: getColor(maxDrawdown) }}
                            >{`${formattedPercent(maxDrawdown)}`}</Text>
                          )}
                          {!upToSmall && (
                            <Text
                              sx={{ flex: 1, textAlign: 'right', color: getColor(sharpeRatio) }}
                            >{`${formattedPercent(sharpeRatio)}`}</Text>
                          )}
                          {!upToSmall && (
                            <Text sx={{ flex: 1, textAlign: 'right', color: getColor(weeklyROI) }}>{`${formattedPercent(
                              weeklyROI,
                            )}`}</Text>
                          )}
                          {!upToSmall && (
                            <Text
                              sx={{ flex: 1, textAlign: 'right', color: getColor(monthlyROI) }}
                            >{`${formattedPercent(monthlyROI)}`}</Text>
                          )}
                          {!upToMedium && (
                            <Text sx={{ flex: 1, textAlign: 'right', color: 'white.400' }}>{`${dayjs(
                              lastUpdated,
                            ).format('YYYY.MM.DD')}`}</Text>
                          )}
                          {!upToMedium && (
                            <Flex sx={{ flex: 1, maxWidth: 128, alignItems: 'center', justifyContent: 'flex-end' }}>
                              <ReactApexChart
                                options={options}
                                series={[{ name: 'ROI', data: cummulativeROI }]}
                                type="line"
                                height={40}
                                width={96}
                              />
                            </Flex>
                          )}
                        </Flex>
                      </Button>
                    </Flex>
                    <Divider sx={{ borderColor: 'rgba(78, 83, 125, 0.3)' }} />
                  </Flex>
                );
              })}
              <Text variant="text.body100" sx={{ textAlign: 'left', color: 'white.200', marginTop: 12 }}>
                More strategies coming soon
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <StrategyInvestModal<Strategy>
        active={active}
        onClose={() => {
          setActiveStrategy(undefined);
          toggle();
        }}
        params={activeStategy}
        onInvest={() => {
          setActiveStrategy(undefined);
          toggle();
        }}
      />
    </>
  );
}
