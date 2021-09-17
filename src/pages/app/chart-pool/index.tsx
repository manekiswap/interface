import { Token } from '@manekiswap/sdk';
import { useMemo, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router';
import { Button, Checkbox, Divider, Flex, IconButton, Label, Text } from 'theme-ui';

import DualTokenLogo from '../../../components/logos/dual-token.logo';
import HeaderButton, { Direction } from '../../../components/tables/header.button';
import { utils } from '../../../constants/token';
import graphs from '../../../graph';
import { PAIR_SORT_FIELD } from '../../../graph/constants';
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

function getFieldName(field: number, useTracked: boolean) {
  switch (field) {
    case PAIR_SORT_FIELD.LIQ:
      return useTracked ? 'trackedReserveUSD' : 'reserveUSD';
    case PAIR_SORT_FIELD.VOL:
      return useTracked ? 'oneDayVolumeUSD' : 'oneDayVolumeUntracked';
    case PAIR_SORT_FIELD.VOL_7DAYS:
      return useTracked ? 'oneWeekVolumeUSD' : 'oneWeekVolumeUntracked';
    case PAIR_SORT_FIELD.FEES:
      return useTracked ? 'oneDayVolumeUSD' : 'oneDayVolumeUntracked';
    default:
      return 'trackedReserveUSD';
  }
}

const MAX_ITEM_PER_PAGE = 10;

export default function ChartPoolPage() {
  const { chainId } = useActiveWeb3React();
  const pairs = graphs.hooks.pair.useAllPairs();

  const history = useHistory();

  const [sortedColumn, setSortedColumn] = useState({
    column: PAIR_SORT_FIELD.LIQ,
    direction: Direction.DESC,
  });

  const [useTracked, setUseTracked] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const data = useMemo(() => {
    const rawData = pairs.reduce((memo, pair) => {
      if (useTracked && !pair.trackedReserveUSD) return memo;

      const renderData = getRenderData(pair);
      if (!renderData) return memo;

      const { liquidity, apy, dayVolume, weekVolume, fees } = renderData;
      const currencyA = utils.fromTokenInfo({
        ...pair.token0,
        chainId: chainId ?? -1,
        address: pair.token0.id,
      });
      const currencyB = utils.fromTokenInfo({
        ...pair.token1,
        chainId: chainId ?? -1,
        address: pair.token1.id,
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

    return rawData.sort((pairA, pairB) => {
      if (sortedColumn.column === PAIR_SORT_FIELD.APY) {
        const apy0 = (pairA.oneDayVolumeUSD * 0.003 * 356 * 100) / pairA.reserveUSD;
        const apy1 = (pairB.oneDayVolumeUSD * 0.003 * 356 * 100) / pairB.reserveUSD;
        return sortedColumn.direction === Direction.ASC ? apy0 - apy1 : apy1 - apy0;
      }
      return sortedColumn.direction === Direction.ASC
        ? parseFloat(pairA[getFieldName(sortedColumn.column, useTracked)] as any) -
            parseFloat(pairB[getFieldName(sortedColumn.column, useTracked) as any])
        : parseFloat(pairB[getFieldName(sortedColumn.column, useTracked)] as any) -
            parseFloat(pairA[getFieldName(sortedColumn.column, useTracked) as any]);
    });
  }, [chainId, pairs, sortedColumn, useTracked]);

  const currentData = useMemo(() => {
    return data.slice(currentPage * MAX_ITEM_PER_PAGE, (currentPage + 1) * MAX_ITEM_PER_PAGE - 1);
  }, [currentPage, data]);

  const maxPage = useMemo(() => {
    return Math.ceil(data.length / MAX_ITEM_PER_PAGE);
  }, [data.length]);

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'dark.400',
      }}
    >
      <Flex sx={{ alignItems: 'center', marginBottom: '8px', justifyContent: 'space-between' }}>
        <Text sx={{ color: 'white.300', fontWeight: 'bold' }}>ALL POOLS</Text>

        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            '& label': {
              width: 'initial',
            },
          }}
        >
          <Label>
            <Checkbox
              defaultChecked={useTracked}
              onChange={({ target }) => {
                setUseTracked(target.checked);
              }}
            />
          </Label>
          <Text sx={{ color: 'subtitle' }}>Hide untracked pairs</Text>
        </Flex>
      </Flex>

      <Flex sx={{ flexDirection: 'column', backgroundColor: 'dark.500', borderRadius: 'lg', padding: 16 }}>
        <Flex sx={{ height: 20 }}>
          <Text sx={{ width: 256, fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>Name</Text>
          <HeaderButton
            label="Liquidity"
            direction={sortedColumn.column === PAIR_SORT_FIELD.LIQ ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: PAIR_SORT_FIELD.LIQ, direction: v.direction * -1 }));
            }}
          />
          <HeaderButton
            label="Volume (24hr)"
            direction={sortedColumn.column === PAIR_SORT_FIELD.VOL ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: PAIR_SORT_FIELD.VOL, direction: v.direction * -1 }));
            }}
          />
          <HeaderButton
            label="Volume (7d)"
            direction={sortedColumn.column === PAIR_SORT_FIELD.VOL_7DAYS ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: PAIR_SORT_FIELD.VOL_7DAYS, direction: v.direction * -1 }));
            }}
          />
          <HeaderButton
            label="Fee (24hr)"
            direction={sortedColumn.column === PAIR_SORT_FIELD.FEES ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: PAIR_SORT_FIELD.FEES, direction: v.direction * -1 }));
            }}
          />
          <HeaderButton
            label="1y Fees/Liquidity"
            direction={sortedColumn.column === PAIR_SORT_FIELD.APY ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: PAIR_SORT_FIELD.APY, direction: v.direction * -1 }));
            }}
          />
        </Flex>
        {currentData.map((pair, index) => {
          const { currencyA, currencyB, id, liquidity, dayVolume, weekVolume, fees, apy } = pair;
          return (
            <Flex key={id} sx={{ flexDirection: 'column' }}>
              <Button
                variant="styles.row"
                sx={{ padding: 0, height: 48 }}
                onClick={() => {
                  history.push(`/app/chart/pool/${id}`);
                }}
              >
                <Flex sx={{ height: '100%', width: '100%', alignItems: 'center' }}>
                  <Flex sx={{ width: 256, alignItems: 'center' }}>
                    <Text sx={{ width: 32 }}>{`${index + 1}`}</Text>
                    <DualTokenLogo currencyA={currencyA} currencyB={currencyB} />
                    <Text sx={{ marginLeft: 12 }}>{`${currencyA.symbol}-${currencyB.symbol}`}</Text>
                  </Flex>
                  <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${liquidity}`}</Text>
                  <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${dayVolume}`}</Text>
                  <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${weekVolume}`}</Text>
                  <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${fees}`}</Text>
                  <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${apy}`}</Text>
                </Flex>
              </Button>
              <Divider color="rgba(92, 92, 92, 0.3)" />
            </Flex>
          );
        })}
        {currentData.length > 0 && (
          <Flex sx={{ alignItems: 'center', alignSelf: 'flex-end', marginTop: 12 }}>
            <IconButton
              sx={{ height: 24, width: 24 }}
              disabled={currentPage === 0}
              onClick={() => {
                setCurrentPage((v) => Math.max(v - 1, 0));
              }}
            >
              <FiArrowLeft size={20} />
            </IconButton>
            <Flex>
              <Text sx={{ marginLeft: '8px', color: 'dark.100', width: 24, textAlign: 'right' }}>{`${
                currentPage + 1
              }`}</Text>
              <Text sx={{ color: 'dark.100', textAlign: 'center' }}>{`/`}</Text>
              <Text sx={{ marginRight: '8px', color: 'dark.100', width: 24, textAlign: 'left' }}>{`${maxPage}`}</Text>
            </Flex>
            <IconButton
              sx={{ height: 24, width: 24 }}
              disabled={currentPage === maxPage - 1}
              onClick={() => {
                setCurrentPage((v) => Math.min(v + 1, maxPage));
              }}
            >
              <FiArrowRight size={20} />
            </IconButton>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
