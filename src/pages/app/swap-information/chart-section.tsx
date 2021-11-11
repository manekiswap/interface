import { Currency } from '@manekiswap/sdk';
import { Button, Flex, FlexProps, Grid, Text } from '@theme-ui/components';
import { useEffect, useState } from 'react';

import useMetrics from '../../../hooks/grpc/useMetric';
import usePrevious from '../../../hooks/usePrevious';
import { GetMetricResponse, GetMetricResult } from '../../../services/proto/CryptoInfo_pb';
import Chart from './chart';

interface Props extends Omit<FlexProps, 'sx'> {
  title: string;
  metrics: string[];
  pair: { from: Currency | undefined; to: Currency | undefined };
}

function resolveData(data: { [key: string]: GetMetricResponse.AsObject }) {
  return ['active_addresses_24h', 'circulation_1d'].reduce((memo, key) => {
    if (!data[key]) return memo;
    let name = '';
    if (key === 'active_addresses_24h') {
      name = '111';
    } else if (key === 'circulation_1d') {
      name = '222';
    }
    memo = [...memo, { name, data: data[key].respList }];
    return memo;
  }, [] as { name: string; data: Array<GetMetricResult.AsObject> }[]);
}

export default function ChartSection(props: Props) {
  const {
    title,
    metrics,
    pair: { from, to },
    ...restProps
  } = props;

  const previousFromToken = usePrevious(from);

  const values0 = useMetrics(metrics, from?.wrapped.address);
  const values1 = useMetrics(metrics, to?.wrapped.address);

  const [selectedToken, setSelectedToken] = useState<0 | 1>(0);

  useEffect(() => {
    if (from && !previousFromToken) {
      setSelectedToken(0);
    }
  }, [from, previousFromToken]);

  return (
    <Flex
      {...restProps}
      sx={{
        flexDirection: 'column',
      }}
    >
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
        <Text variant="body300" sx={{ color: 'blue.300' }}>
          {title}
        </Text>
        <Text variant="caps100" sx={{ color: 'dark.200' }}>
          Last update at Aug 8,2021, 0:00AM
        </Text>
      </Flex>
      <Flex
        sx={{
          width: '100%',
          padding: 12,
          bg: 'dark.400',
          marginTop: '8px',
          borderRadius: 'lg',
          border: '1px solid #3C3F5A',
          flexDirection: 'column',
        }}
      >
        <Grid gap={12} columns={[1, null, 2]} sx={{ marginBottom: 12 }}>
          <TokenScore
            token={from}
            active={selectedToken === 0}
            onClick={() => setSelectedToken(0)}
            score={3}
            totalScore={3}
          />
          <TokenScore
            token={to}
            active={selectedToken === 1}
            onClick={() => setSelectedToken(1)}
            score={3}
            totalScore={3}
          />
        </Grid>
        <Chart
          sx={{ marginTop: 12 }}
          token={selectedToken === 0 ? from : to}
          series={selectedToken === 0 ? resolveData(values0) : resolveData(values1)}
          labels={['111', '222']}
        />
      </Flex>
    </Flex>
  );
}

interface TokenScoreProps {
  active: boolean;
  onClick: () => void;
  score: number;
  totalScore: number;
  token?: Currency;
}

function TokenScore({ active, score, totalScore, token, onClick }: TokenScoreProps) {
  if (!token) {
    return (
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 'lg',
          backgroundColor: 'dark.400',
          padding: 12,
          border: '1px solid #3C3F5A',
        }}
      >
        <Text variant="body200" sx={{ color: 'dark.300' }}>
          Token momentum score
        </Text>
      </Flex>
    );
  }
  return (
    <Button
      variant="ghost"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 'lg',
        backgroundColor: active ? 'dark.300' : 'dark.400',
        padding: 12,
        border: '1px solid #3C3F5A',
        '&&:hover': {
          backgroundColor: 'dark.300',
        },
      }}
      onClick={onClick}
    >
      <Text variant={active ? 'body300' : 'body100'}>{token.symbol} Score</Text>
      <Text variant={active ? 'body300' : 'body100'} sx={{ color: 'green.200' }}>
        {score}/{totalScore}
      </Text>
    </Button>
  );
}
