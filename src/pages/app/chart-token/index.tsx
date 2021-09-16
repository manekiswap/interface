import { Currency } from '@manekiswap/sdk';
import { useMemo, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Divider, Flex, IconButton, Text } from 'theme-ui';

import TokenLogo from '../../../components/logos/token.logo';
import HeaderButton, { Direction } from '../../../components/tables/header.button';
import { utils } from '../../../constants/token';
import graphs from '../../../graph';
import { TOKEN_SORT_FIELD } from '../../../graph/constants';
import { TokenData } from '../../../graph/reducers/types';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { formattedNum, formattedPercent } from '../../../utils/numbers';

function getRenderData(tokenData: TokenData) {
  if (tokenData) {
    const liquidity = formattedNum(tokenData.totalLiquidityUSD, true);

    const dayVolume = formattedNum(tokenData.oneDayVolumeUSD, true);

    const price = formattedNum(tokenData.priceUSD, true);

    const change = formattedPercent(tokenData.priceChangeUSD);

    return {
      liquidity,
      dayVolume,
      price,
      change,
    };
  }

  return null;
}

function getFieldName(field: number) {
  switch (field) {
    case TOKEN_SORT_FIELD.LIQ:
      return 'totalLiquidityUSD';
    case TOKEN_SORT_FIELD.VOL:
      return 'oneDayVolumeUSD';
    case TOKEN_SORT_FIELD.SYMBOL:
      return 'symbol';
    case TOKEN_SORT_FIELD.NAME:
      return 'name';
    case TOKEN_SORT_FIELD.PRICE:
      return 'priceUSD';
    case TOKEN_SORT_FIELD.CHANGE:
      return 'priceChangeUSD';
    default:
      return 'trackedReserveUSD';
  }
}

const MAX_ITEM_PER_PAGE = 10;

export default function ChartTokenPage() {
  const { chainId } = useActiveWeb3React();
  const tokens = graphs.hooks.token.useAllTokens();

  const [sortedColumn, setSortedColumn] = useState({
    column: TOKEN_SORT_FIELD.VOL,
    direction: Direction.DESC,
  });

  const [currentPage, setCurrentPage] = useState(0);

  const data = useMemo(() => {
    const rawData = tokens.reduce((memo, token) => {
      const renderData = getRenderData(token);
      if (!renderData) return memo;

      const { liquidity, dayVolume, price, change } = renderData;
      const currency = utils.fromTokenInfo({
        ...token,
        chainId: chainId ?? -1,
        address: token.id,
        decimals: Number(token.decimals),
      });
      return [
        ...memo,
        {
          liquidity,
          dayVolume,
          price,
          change,
          currency,
          ...token,
        },
      ];
    }, [] as Array<TokenData & { currency: Currency; liquidity: string | number; dayVolume: string | number; price: string | number; change: string | number }>);

    return rawData.sort((tokenA, tokenB) => {
      if (sortedColumn.column === TOKEN_SORT_FIELD.SYMBOL || sortedColumn.column === TOKEN_SORT_FIELD.NAME) {
        const value = tokenA[getFieldName(sortedColumn.column)] > tokenB[getFieldName(sortedColumn.column)] ? 1 : -1;
        return sortedColumn.direction === Direction.ASC ? value * -1 : value;
      }
      return sortedColumn.direction === Direction.ASC
        ? parseFloat(tokenA[getFieldName(sortedColumn.column)] as any) -
            parseFloat(tokenB[getFieldName(sortedColumn.column) as any])
        : parseFloat(tokenB[getFieldName(sortedColumn.column)] as any) -
            parseFloat(tokenA[getFieldName(sortedColumn.column) as any]);
    });
  }, [chainId, sortedColumn.column, sortedColumn.direction, tokens]);

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
        <Text sx={{ color: 'white.300', fontWeight: 'bold' }}>ALL TOKENS</Text>
      </Flex>

      <Flex sx={{ flexDirection: 'column', backgroundColor: 'dark.500', borderRadius: 'lg', padding: 16 }}>
        <Flex sx={{ height: 20 }}>
          <Text sx={{ width: 256, fontSize: 0, fontWeight: 'medium', color: 'white.200' }}>Name</Text>
          <HeaderButton
            label="Symbol"
            direction={sortedColumn.column === TOKEN_SORT_FIELD.SYMBOL ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: TOKEN_SORT_FIELD.SYMBOL, direction: v.direction * -1 }));
            }}
          />
          <HeaderButton
            label="Liquidity"
            direction={sortedColumn.column === TOKEN_SORT_FIELD.LIQ ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: TOKEN_SORT_FIELD.LIQ, direction: v.direction * -1 }));
            }}
          />
          <HeaderButton
            label="Volume (24hr)"
            direction={sortedColumn.column === TOKEN_SORT_FIELD.VOL ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: TOKEN_SORT_FIELD.VOL, direction: v.direction * -1 }));
            }}
          />
          <HeaderButton
            label="Price"
            direction={sortedColumn.column === TOKEN_SORT_FIELD.PRICE ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: TOKEN_SORT_FIELD.PRICE, direction: v.direction * -1 }));
            }}
          />
          <HeaderButton
            label="Price Change (24hr)"
            direction={sortedColumn.column === TOKEN_SORT_FIELD.CHANGE ? sortedColumn.direction : undefined}
            onClick={() => {
              setSortedColumn((v) => ({ column: TOKEN_SORT_FIELD.CHANGE, direction: v.direction * -1 }));
            }}
          />
        </Flex>
        {currentData.map((pair, index) => {
          const { currency, id, liquidity, dayVolume, price, change } = pair;
          return (
            <Flex key={id} sx={{ flexDirection: 'column' }}>
              <Flex sx={{ height: 48, alignItems: 'center' }}>
                <Flex sx={{ width: 256, alignItems: 'center' }}>
                  <Text sx={{ width: 32 }}>{`${index + 1}`}</Text>
                  <TokenLogo currency={currency} />
                  <Text sx={{ marginLeft: 12 }}>{`${currency.name}`}</Text>
                </Flex>
                <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${currency.symbol}`}</Text>
                <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${liquidity}`}</Text>
                <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${dayVolume}`}</Text>
                <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${price}`}</Text>
                <Text sx={{ flex: 1, textAlign: 'right', color: 'white.200' }}>{`${change}`}</Text>
              </Flex>
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
