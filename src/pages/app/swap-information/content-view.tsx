import { Flex, FlexProps, Grid, Heading } from '@theme-ui/components';

import { mediaWidthTemplates } from '../../../constants/media';
import TokenInfo from './token-info';
import TokenScore from './token-score';

interface Props extends Omit<FlexProps, 'sx'> {
  a?: boolean;
}

export default function ContentView(props: Props) {
  const { className } = props;

  return (
    <Flex
      className={className}
      sx={{ flexDirection: 'column', ...mediaWidthTemplates.upToSmall({ paddingBottom: 144 }) }}
    >
      <Flex
        sx={{
          backgroundColor: 'dark.400',
          flexDirection: 'column',
          width: '100%',
          paddingX: 28,
          paddingY: 28,
          ...mediaWidthTemplates.upToSmall({ paddingTop: 24, paddingBottom: 28 }),
        }}
      >
        <Heading
          variant="styles.h4"
          sx={{
            display: 'none',
            ...mediaWidthTemplates.upToSmall({ display: 'flex', marginBottom: '8px' }),
          }}
        >
          Swap
        </Heading>
        <Grid {...{ name: 'generalAnchor' }} gap={12} columns={['1fr', '1fr', '1fr 1fr']}>
          <TokenInfo />
          <TokenInfo />
          <TokenScore />
          <TokenScore />
        </Grid>
      </Flex>
      <Heading
        variant="styles.h6"
        {...{ name: 'momentumAnchor' }}
        sx={{
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: '8px',
          marginTop: 24,
          marginX: 28,
        }}
      >
        Momentum
      </Heading>
      <Flex sx={{ height: 480, backgroundColor: 'blue.300', marginX: 28 }}></Flex>

      <Heading
        variant="styles.h6"
        {...{ name: 'ownershipAnchor' }}
        sx={{
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: '8px',
          marginTop: 24,
          marginX: 28,
        }}
      >
        Ownership
      </Heading>
      <Flex sx={{ height: 480, backgroundColor: 'blue.300', marginX: 28 }}></Flex>

      <Heading
        variant="styles.h6"
        {...{ name: 'fundamentalAnchor' }}
        sx={{
          lineHeight: '28px',
          borderRadius: 'lg',
          marginBottom: '8px',
          marginTop: 24,
          marginX: 28,
        }}
      >
        Fundamental
      </Heading>
      <Flex sx={{ height: 480, backgroundColor: 'blue.300', marginX: 28, marginBottom: 24 }}></Flex>
    </Flex>
  );
}
