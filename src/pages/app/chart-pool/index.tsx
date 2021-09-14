import { Token } from '@manekiswap/sdk';
import { useMemo } from 'react';
import { Divider, Flex, Text } from 'theme-ui';

import DualTokenLogo from '../../../components/logos/dual-token.logo';
import { utils } from '../../../constants/token';
import graphs from '../../../graph';
import { PairData } from '../../../graph/reducers/types';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { formattedNum, formattedPercent } from '../../../utils/numbers';

function getRenderData(pairData: PairData) {
  if (pairData && pairData.token0 && pairData.token1) {
    const liquidity = formattedNum(
      !!pairData.trackedReserveUSD ? pairData.trackedReserveUSD : pairData.reserveUSD,
      true,
    );

    const apy = formattedPercent(
      ((pairData.oneDayVolumeUSD ? pairData.oneDayVolumeUSD : pairData.oneDayVolumeUntracked) * 0.003 * 365 * 100) /
        (pairData.oneDayVolumeUSD ? pairData.trackedReserveUSD : pairData.reserveUSD),
    );

    const dayVolume = formattedNum(
      pairData.oneDayVolumeUSD ? pairData.oneDayVolumeUSD : pairData.oneDayVolumeUntracked,
      true,
    );

    const weekVolume = formattedNum(
      pairData.oneWeekVolumeUSD ? pairData.oneWeekVolumeUSD : pairData.oneWeekVolumeUntracked,
      true,
    );

    const fees = formattedNum(
      pairData.oneDayVolumeUSD ? pairData.oneDayVolumeUSD * 0.003 : pairData.oneDayVolumeUntracked * 0.003,
      true,
    );

    return {
      liquidity,
      apy,
      dayVolume,
      weekVolume,
      fees,
    };
  }

  return null;
}

const pair0 = {
  __typename: 'Pair',
  createdAtTimestamp: 1616909069,
  id: '0x94b0a3d511b6ecdb17ebf877278ab030acb0a878',
  reserve0: '143425190.478485174726114079',
  reserve1: '43458.690418600255301169',
  reserveETH: 86917.38083720052,
  reserveUSD: 286326990.64530843,
  token0: {
    __typename: 'Token',
    derivedETH: '0.0003030059801462796454919734125414556',
    id: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
    name: 'Fei USD',
    symbol: 'FEI',
    totalLiquidity: '308704771.738485114080063714',
  },
  token0Price: '3300.264897469147047093292309279578',
  token1: {
    __typename: 'Token',
    derivedETH: '1',
    id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    totalLiquidity: '534647.965915770467062566',
  },
  token1Price: '0.0003030059801462796454919734125414556',
  totalSupply: '2419383.290172932481683934',
  trackedReserveETH: 86917.38083720052,
  txCount: '42970',
  untrackedVolumeUSD: '6182549322.383787009808676138978633',
  volumeUSD: 6182867309.697475,
  oneDayVolumeUSD: 28777533.21223545,
  oneWeekVolumeUSD: 166846136.17750835,
  volumeChangeUSD: 71.23884767927933,
  oneDayVolumeUntracked: 28778725.60046196,
  oneWeekVolumeUntracked: 166842435.19732857,
  volumeChangeUntracked: 71.24398420823462,
  trackedReserveUSD: 286331096.38823104,
  liquidityChangeUSD: -0.10633547867113907,
};
const pair1 = {
  __typename: 'Pair',
  createdAtTimestamp: 1608657192,
  id: '0x21b8065d10f73ee2e260e5b47d3344d3ced7596e',
  reserve0: '307929291.436641023089863719',
  reserve1: '48177.825471990027261205',
  reserveETH: 96355.65094398006,
  reserveUSD: 317279236.0897906,
  token0: {
    __typename: 'Token',
    derivedETH: '0.0001564574297145194124473426572995472',
    id: '0x66a0f676479cee1d7373f3dc2e2952778bff5bd6',
    name: 'Wise Token',
    symbol: 'WISE',
    totalLiquidity: '307930746.41517704016022366',
  },
  token0Price: '6391.514943231864676196087774302453',
  token1: {
    __typename: 'Token',
    derivedETH: '1',
    id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    totalLiquidity: '534647.965915770467062566',
  },
  token1Price: '0.0001564574297145194124473426572995472',
  totalSupply: '3818356.847923852558779215',
  trackedReserveETH: 96355.65094398006,
  txCount: '67044',
  untrackedVolumeUSD: '599664609.8851286020173406682328755',
  volumeUSD: 673204007.8963554,
  oneDayVolumeUSD: 311900.9438294172,
  oneWeekVolumeUSD: 1035154.3014127016,
  volumeChangeUSD: 82.72288838037714,
  oneDayVolumeUntracked: 312078.3661273718,
  oneWeekVolumeUntracked: 1036021.9566594362,
  volumeChangeUntracked: 82.65287609460273,
  trackedReserveUSD: 317423499.3305641,
  liquidityChangeUSD: -0.36231985159588365,
};

export default function ChartPoolPage() {
  const { chainId } = useActiveWeb3React();
  const pairs = graphs.hooks.pair.useAllPairs();
  // const pairs = [pair0, pair1];

  const data = useMemo(() => {
    return pairs.reduce((memo, pair) => {
      const renderData = getRenderData(pair);
      if (!renderData) return memo;

      const { liquidity, apy, dayVolume, weekVolume, fees } = renderData;
      const currencyA = utils.fromTokenInfo({
        ...pair.token0,
        chainId: chainId ?? -1,
        address: pair.token0.id,
        decimals: Number(pair.token0.decimals),
      });
      const currencyB = utils.fromTokenInfo({
        ...pair.token1,
        chainId: chainId ?? -1,
        address: pair.token1.id,
        decimals: Number(pair.token1.decimals),
      });
      return [
        ...memo,
        {
          liquidity,
          apy,
          dayVolume,
          weekVolume,
          fees,
          currencyA,
          currencyB,
          ...pair,
        },
      ];
    }, [] as Array<PairData & { currencyA: Token; currencyB: Token; liquidity: string | number; apy: string; dayVolume: string | number; weekVolume: string | number; fees: string | number }>);
  }, [chainId, pairs]);

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'dark.400',
      }}
    >
      <Text sx={{ color: 'white.300', fontWeight: 'bold', marginBottom: '8px' }}>ALL POOLS</Text>

      <Flex sx={{ flexDirection: 'column', backgroundColor: 'dark.500', borderRadius: 'lg', padding: 16 }}>
        <Flex sx={{ height: 20 }}>
          <Text sx={{ width: 256, fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>Name</Text>
          <Text sx={{ flex: 1, textAlign: 'right', fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>
            Liquidity
          </Text>
          <Text sx={{ flex: 1, textAlign: 'right', fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>
            Volume (24hr)
          </Text>
          <Text sx={{ flex: 1, textAlign: 'right', fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>
            Volume (7d)
          </Text>
          <Text sx={{ flex: 1, textAlign: 'right', fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>
            Fee (24hr)
          </Text>
          <Text sx={{ flex: 1, textAlign: 'right', fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>
            1y Fees/Liquidity
          </Text>
        </Flex>
        {data.map((pair, index) => {
          const { currencyA, currencyB, id, liquidity, dayVolume, weekVolume, fees, apy } = pair;
          return (
            <Flex key={pair.id} sx={{ flexDirection: 'column' }}>
              <Flex sx={{ height: 48, alignItems: 'center' }}>
                <Flex sx={{ width: 256, alignItems: 'center' }}>
                  <Text sx={{ width: 36 }}>{`${index + 1}`}</Text>
                  <DualTokenLogo currencyA={currencyA} currencyB={currencyB} />
                  <Text sx={{ marginLeft: 12 }}>{`${pair.token0.symbol}-${pair.token1.symbol}`}</Text>
                </Flex>
                <Text sx={{ flex: 1, textAlign: 'right' }}>{`${liquidity}`}</Text>
                <Text sx={{ flex: 1, textAlign: 'right' }}>{`${dayVolume}`}</Text>
                <Text sx={{ flex: 1, textAlign: 'right' }}>{`${weekVolume}`}</Text>
                <Text sx={{ flex: 1, textAlign: 'right' }}>{`${fees}`}</Text>
                <Text sx={{ flex: 1, textAlign: 'right' }}>{`${apy}`}</Text>
              </Flex>
              <Divider color="rgba(92, 92, 92, 0.3)" />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
