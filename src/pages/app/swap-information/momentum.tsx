import { Currency } from '@manekiswap/sdk';
import { Button, Flex, FlexProps, Grid, Text } from '@theme-ui/components';

import Chart from './chart';

interface Props extends Omit<FlexProps, 'sx'> {
  pair: { from: Currency | undefined; to: Currency | undefined };
}

export default function Momentum(props: Props) {
  const {
    pair: { from, to },
    ...restProps
  } = props;

  return (
    <Flex {...restProps} sx={{ flexDirection: 'column', paddingX: 28 }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
        <Text variant="body300" sx={{ color: 'blue.300' }}>
          MOMENTUM
        </Text>
        <Text variant="caps100">Last update at Aug 8,2021, 0:00AM</Text>
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
        <Grid gap={12} columns={2} sx={{ marginBottom: 12 }}>
          <TokenScore token={from} active onClick={() => {}} score={3} totalScore={3} />
          <TokenScore token={to} active onClick={() => {}} score={3} totalScore={3} />
        </Grid>
        <Chart />
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
        onClick={onClick}
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
      }}
    >
      <Text variant={active ? 'body300' : 'body100'}>{token.symbol} Score</Text>
      <Text variant={active ? 'body300' : 'body100'} sx={{ color: 'green.200' }}>
        {score}/{totalScore}
      </Text>
    </Button>
  );
}
