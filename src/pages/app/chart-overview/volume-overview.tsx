import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Flex, FlexProps, Heading, Text } from 'theme-ui';

import graphs from '../../../graph';
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { formattedNum } from '../../../utils/numbers';

type Props = Omit<FlexProps, 'sx'>;

export default function VolumeOverview(props: Props) {
  const { className } = props;

  const [label, setLabel] = useState<string>('');
  const [value, setValue] = useState<string>('$0');

  const { chainId } = useActiveWeb3React();

  const chartData = graphs.useSelector((state) => state.global.ofChain[chainId ?? -1].chartData);

  const data = useMemo(() => {
    return (chartData?.daily ?? []).map((value) => {
      return {
        day: value.date,
        amt: parseFloat(value.dailyVolumeUSD),
      };
    });
  }, [chartData?.daily]);

  return (
    <Flex
      className={className}
      sx={{ flexDirection: 'column', backgroundColor: 'dark.500', borderRadius: 'lg', padding: 16 }}
    >
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text sx={{ color: 'white.100', fontWeight: 'medium' }}>Volume 24H</Text>
      </Flex>
      <Heading as="h5" variant="styles.h5" sx={{ marginY: '4px' }}>
        {`${value}`}
      </Heading>
      <Text sx={{ fontSize: 0, color: 'white.300', height: 18 }}>{label}</Text>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart
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
          <Bar dataKey="amt" fill="rgba(113, 215, 190, 0.8)" />
        </BarChart>
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
