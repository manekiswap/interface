import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Flex, FlexProps, Heading, Text } from 'theme-ui';

import useIsWindowVisible from '../../../hooks/useIsWindowVisible';

type Props = Omit<FlexProps, 'sx'>;

export default function VolumeOverview(props: Props) {
  const { className } = props;

  const [now, setNow] = useState(dayjs().startOf('day'));
  const [label, setLabel] = useState<string>(now.format('MMM DD, YYYY UTCZ'));
  const [value, setValue] = useState<number>(0);
  const isActive = useIsWindowVisible();

  useEffect(() => {
    if (!isActive) return;
    setNow(dayjs().startOf('day'));
  }, [isActive]);

  const data = useMemo(() => {
    const memo: { day: Date; amt: number }[] = [];
    let tick = now.subtract(3, 'months');
    while (tick < now) {
      memo.push({
        day: tick.toDate(),
        amt: (Math.floor(Math.random() * 200000) + 10000) / 100,
      });
      tick = tick.add(1, 'days');
    }
    return memo;
  }, [now]);

  return (
    <Flex
      className={className}
      sx={{ flexDirection: 'column', backgroundColor: 'dark.500', borderRadius: 'lg', padding: 16 }}
    >
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text sx={{ color: 'white.100', fontWeight: 'medium' }}>Volume 24H</Text>
      </Flex>
      <Heading as="h5" variant="styles.h5" sx={{ marginY: '4px' }}>
        {`$${value}`}
      </Heading>
      <Text sx={{ fontSize: 0, color: 'white.300' }}>{label}</Text>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            tick={CustomizedAxisTick}
            tickLine={false}
            tickFormatter={(value) => dayjs(value).format('DD')}
          />
          <Tooltip
            contentStyle={{ display: 'none' }}
            formatter={(value: number, name: string, props: { payload: { day: Date; amt: number } }) => {
              setValue(props.payload.amt);
              setLabel(dayjs(props.payload.day).format('MMM DD, YYYY UTCZ'));
            }}
          />
          <Bar dataKey="amt" fill="rgba(113, 215, 190, 0.8)" />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
}

function CustomizedAxisTick(props: { x: number; y: number; payload: { value: Date } }) {
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
        {dayjs(payload.value).format('DD')}
      </text>
    </g>
  );
}
