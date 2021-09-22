import dayjs from 'dayjs';
import { createChart, IChartApi } from 'lightweight-charts';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Flex, FlexProps, Heading, Text } from 'theme-ui';

import graphs from '../../../graph';
import { formattedNum } from '../../../utils/numbers';

type Props = Omit<FlexProps, 'sx'>;

export default function LiquidityOverview(props: Props) {
  const { className } = props;

  const ref = useRef<HTMLDivElement>(null);
  // const chart: MutableRefObject<IChartApi | undefined> = useRef<IChartApi>();

  const [label, setLabel] = useState<string>('');
  const [value, setValue] = useState<string>('$0');

  const [daily] = graphs.hooks.global.useChartData();

  // useEffect(() => {
  //   if (!ref.current) return;
  //   chart.current = createChart(ref.current, { width: 400, height: 300 });
  // }, []);

  const data = useMemo(() => {
    return (daily ?? []).map((value) => {
      return {
        day: value.date,
        amt: value.totalLiquidityUSD,
      };
    });
  }, [daily]);

  return (
    <Flex
      className={className}
      sx={{
        flexDirection: 'column',
        backgroundColor: 'dark.500',
        borderRadius: 'lg',
        padding: 16,
        position: 'relative',
      }}
    >
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text sx={{ color: 'white.100', fontWeight: 'medium' }}>Liquidity</Text>
      </Flex>
      <Heading as="h5" variant="styles.h5" sx={{ marginY: '4px' }}>
        {`${value}`}
      </Heading>
      <Text sx={{ fontSize: 0, color: 'white.300', height: 18 }}>{label}</Text>
      <Flex ref={ref}></Flex>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart
          height={180}
          data={data}
          onMouseLeave={() => {
            setLabel('');
            setValue('$0');
          }}
        >
          <XAxis
            dataKey="day"
            tick={CustomizedAxisTick}
            tickLine={false}
            tickFormatter={(value) => dayjs.unix(value).format('DD')}
          />
          <Tooltip
            contentStyle={{ display: 'none' }}
            formatter={(value: number, name: string, props: { payload: { day: number; amt: number } }) => {
              setValue(formattedNum(props.payload.amt, true) + '');
              setLabel(dayjs.unix(props.payload.day).format('MMM DD, YYYY UTCZ'));
            }}
          />
          <Area type="monotone" dataKey="amt" stroke="#71D7BE" fill="rgba(113, 215, 190, 0.8)" opacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
}

function CustomizedAxisTick(props: { x: number; y: number; payload: { value: number } }) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={12}
        textAnchor="middle"
        fill="#666"
        fontSize={10}
        fontFamily={
          '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
        }
      >
        {dayjs.unix(payload.value).format('DD')}
      </text>
    </g>
  );
}
