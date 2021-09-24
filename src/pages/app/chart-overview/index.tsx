import { Flex, Heading, Text } from 'theme-ui';

import { mediaWidthTemplates } from '../../../constants/media';
import graphs from '../../../graph';
import { down, up } from '../../../graph/constants';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { formatAmount, formattedNum } from '../../../utils/numbers';
import LiquidityOverview from './liquidity-overview';
import VolumeOverview from './volume-overview';

export default function ChartOverviewPage() {
  const { chainId } = useActiveWeb3React();

  const factoryData = graphs.useSelector((state) => state.global.ofChain[chainId ?? -1].factoryData);
  const prices = graphs.hooks.global.useEthPrice();

  return (
    <Flex
      sx={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'dark.400',
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginTop: 28,
          ...mediaWidthTemplates.upToExtraSmall({
            marginTop: 16,
          }),
        }}
      >
        <Text sx={{ marginBottom: '8px', textTransform: 'uppercase', color: 'white.300', fontWeight: 'bold' }}>
          Overview
        </Text>
        <Flex sx={{ marginY: 16 }}>
          <Heading as="h6" variant="styles.h6" sx={{ fontSize: 1 }}>
            {`ETH Price ${formattedNum(prices?.currentDayEthPrice, true)}`}
          </Heading>
        </Flex>
        <Flex
          sx={{
            width: '100%',
            flexDirection: 'row',
            '&>div:first-of-type': { marginRight: 24, marginBottom: 0 },
            ...mediaWidthTemplates.upToExtraSmall({
              flexDirection: 'column',
              '&>div:first-of-type': { marginRight: 0, marginBottom: 24 },
            }),
          }}
        >
          <LiquidityOverview sx={{ flex: 1 }} />
          <VolumeOverview sx={{ flex: 1 }} />
        </Flex>
        <Flex
          sx={{
            height: 56,
            width: '100%',
            backgroundColor: 'dark.500',
            borderRadius: 'lg',
            alignItems: 'center',
            marginTop: 12,
            paddingX: 16,
            flexDirection: 'row',
            ...mediaWidthTemplates.upToSmall({
              flexDirection: 'column',
              alignItems: 'flex-start',
              height: 'initial',
              paddingY: 16,
            }),
          }}
        >
          <Flex>
            <Text sx={{ color: 'white.200', ...mediaWidthTemplates.upToSmall({ marginBottom: 16 }) }}>
              Transactions (24H):
            </Text>
            <Text sx={{ marginX: '4px' }}>{formatAmount(factoryData?.oneDayTxns)}</Text>
          </Flex>
          <Flex sx={{ marginLeft: 32, ...mediaWidthTemplates.upToSmall({ marginLeft: 0, marginBottom: 16 }) }}>
            <Text sx={{ color: 'white.200' }}>Pairs:</Text>
            <Text sx={{ marginX: '4px' }}>{formatAmount(factoryData?.pairCount)}</Text>
          </Flex>
          <Flex sx={{ marginLeft: 32, ...mediaWidthTemplates.upToSmall({ marginLeft: 0, marginBottom: 16 }) }}>
            <Text sx={{ color: 'white.200' }}>Fees (24H):</Text>
            <Text sx={{ marginX: '4px' }}>{formattedNum(factoryData?.oneDayVolumeUSD * 0.003, true)}</Text>
          </Flex>
          <Flex sx={{ marginLeft: 32, ...mediaWidthTemplates.upToSmall({ marginLeft: 0 }) }}>
            <Text sx={{ color: 'white.200' }}>Volume (24H):</Text>
            <Text sx={{ marginX: '4px' }}>{`${formattedNum(factoryData?.oneDayVolumeUSD, true)}`}</Text>
            <Text
              sx={{
                color:
                  factoryData?.volumeChangeUSD > 0
                    ? 'green.200'
                    : factoryData?.volumeChangeUSD < 0
                    ? 'red.200'
                    : 'dark.200',
              }}
            >{`(${factoryData?.volumeChangeUSD > 0 ? up : factoryData?.volumeChangeUSD < 0 ? down : '0'}${Math.abs(
              factoryData?.volumeChangeUSD ?? 0,
            ).toFixed(2)}%)`}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
