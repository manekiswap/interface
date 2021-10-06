import { Flex, FlexProps, Grid, Heading } from '@theme-ui/components';

import TokenInfo from './token-info';
import TokenScore from './token-score';

interface Props extends Omit<FlexProps, 'sx'> {
  a?: boolean;
}

export default function ContentView(props: Props) {
  const { className } = props;

  return (
    <Flex className={className} sx={{ paddingX: 28, flexDirection: 'column' }}>
      <Grid
        {...{ name: 'generalAnchor' }}
        gap={12}
        columns={['1fr', '1fr', '1fr 1fr']}
        sx={{ padding: 28, backgroundColor: 'dark.400', marginX: -28 }}
      >
        <TokenInfo />
        <TokenInfo />
        <TokenScore />
        <TokenScore />
      </Grid>

      <Heading
        variant="styles.h6"
        {...{ name: 'momentumAnchor' }}
        sx={{
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: '8px',
          marginTop: 24,
        }}
      >
        Momentum
      </Heading>
      <Flex sx={{ height: 480, width: '100%', backgroundColor: 'blue.300' }}></Flex>

      <Heading
        variant="styles.h6"
        {...{ name: 'ownershipAnchor' }}
        sx={{
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: '8px',
          marginTop: 24,
        }}
      >
        Ownership
      </Heading>
      <Flex sx={{ height: 480, width: '100%', backgroundColor: 'blue.300' }}></Flex>

      <Heading
        variant="styles.h6"
        {...{ name: 'fundamentalAnchor' }}
        sx={{
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: '8px',
          marginTop: 24,
        }}
      >
        Fundamental
      </Heading>
      <Flex sx={{ height: 480, width: '100%', backgroundColor: 'blue.300' }}></Flex>
    </Flex>
  );
}
