import { add, format, startOfDay, sub } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Flex, FlexProps, Heading, Text } from 'theme-ui';

import useIsWindowVisible from '../../../hooks/useIsWindowVisible';

type Props = Omit<FlexProps, 'sx'>;

export default function VolumeOverview(props: Props) {
  const { className } = props;

  const [now, setNow] = useState(startOfDay(Date.now()));
  const [label, setLabel] = useState<string>(format(now, "MMM d, yyyy 'UTC' XXX"));
  const [value, setValue] = useState<number>(0);
  const isActive = useIsWindowVisible();

  useEffect(() => {
    if (!isActive) return;
    setNow(startOfDay(Date.now()));
  }, [isActive]);

  const data = useMemo(() => {
    const memo: { day: Date; amt: number }[] = [];
    let tick = sub(now, { months: 3 });
    while (tick < now) {
      memo.push({
        day: tick,
        amt: (Math.floor(Math.random() * 200000) + 10000) / 100,
      });
      tick = add(tick, { days: 1 });
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
            tickFormatter={(value) => format(value, 'dd')}
          />
          <Tooltip
            contentStyle={{ display: 'none' }}
            formatter={(value: number, name: string, props: { payload: { day: Date; amt: number } }) => {
              setValue(props.payload.amt);
              setLabel(format(props.payload.day, "MMM d, yyyy 'UTC' XXX"));
            }}
          />
          <Bar dataKey="amt" fill="#82e39d" />
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
        {format(payload.value, 'dd')}
      </text>
    </g>
  );
}
