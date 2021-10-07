import { Currency } from '@manekiswap/sdk';
import { Flex, FlexProps, Grid, Heading } from '@theme-ui/components';
import { ThemeUIStyleObject } from '@theme-ui/css';
import { useMemo } from 'react';

import { mediaWidthTemplates } from '../../../constants/media';
import useScroll from '../../../hooks/useScroll';
import TokenInfo from './token-info';
import TokenScore from './token-score';
import TokenScoreHeaderView from './token-score-header.view';

interface Props extends Omit<FlexProps, 'sx'> {
  pair: { from: Currency | undefined; to: Currency | undefined };
}

export default function ContentView(props: Props) {
  const {
    className,
    pair: { from, to },
  } = props;

  const { rect, ref } = useScroll<HTMLDivElement>();

  const style = useMemo<ThemeUIStyleObject>(() => {
    return rect?.y + rect?.height < 80 + 68
      ? {
          left: rect.left,
          width: rect.width,
          opacity: 1,
          visibility: 'visible',
        }
      : {
          left: rect.left,
          width: rect.width,
          opacity: 0,
          visibility: 'hidden',
        };
  }, [rect]);

  return (
    <Flex
      className={className}
      sx={{ flexDirection: 'column', ...mediaWidthTemplates.upToSmall({ paddingBottom: from && to ? 144 : 78 }) }}
    >
      <TokenScoreHeaderView sx={style} from={from} to={to} />

      <Flex
        ref={ref}
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
          <TokenInfo token={from} />
          <TokenInfo token={to} />
          <TokenScore token={from} />
          <TokenScore token={to} />
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
