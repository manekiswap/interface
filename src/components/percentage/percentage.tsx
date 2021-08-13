import { useMemo } from 'react';
import { Text, TextProps } from 'theme-ui';

interface Props extends Omit<TextProps, 'sx'> {
  value: number;
  decimals?: number;
}

export default function Percentage(props: Props) {
  const { className, value, decimals = 2 } = props;
  const truncated = parseFloat(value.toFixed(decimals));

  const color = useMemo(() => {
    if (truncated < 0) return 'red.200';
    else if (truncated > 0) return 'green.200';
    else return 'white.200';
  }, [truncated]);

  return (
    <Text className={className} sx={{ color: color }}>
      {truncated < 0 && '↓'}
      {truncated > 0 && '↑'}
      {`${Math.abs(value).toFixed(decimals)}%`}
    </Text>
  );
}
