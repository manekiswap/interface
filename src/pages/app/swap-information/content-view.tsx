import { Currency } from '@manekiswap/sdk';
import { Flex, FlexProps, Grid, Heading } from '@theme-ui/components';
import { ThemeUIStyleObject } from '@theme-ui/css';
import { useMemo } from 'react';

import { mediaWidthTemplates } from '../../../constants/media';
import useScroll from '../../../hooks/useScroll';
import ChartSection from './chart-section';
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
          zIndex: 2,
        }
      : {
          left: rect.left,
          width: rect.width,
          opacity: 0,
          visibility: 'hidden',
          zIndex: 2,
        };
  }, [rect]);

  return (
    <Flex
      className={className}
      sx={{
        flexDirection: 'column',
        ...mediaWidthTemplates.upToMedium({ paddingBottom: (from && to ? 144 : 78) + 28 }),
      }}
    >
      <TokenScoreHeaderView sx={style} from={from} to={to} />

      <Flex sx={{ backgroundColor: 'dark.400' }}>
        <Flex
          ref={ref}
          sx={{
            flexDirection: 'column',
            paddingX: 28,
            paddingY: 28,
            width: 860,
            ...mediaWidthTemplates.upToMedium({ paddingTop: 24, paddingBottom: 28, paddingX: 16, width: '100%' }),
          }}
        >
          <Heading
            variant="styles.h4"
            sx={{
              display: 'none',
              ...mediaWidthTemplates.upToMedium({ display: 'flex', marginBottom: '8px' }),
            }}
          >
            Swap
          </Heading>

          <Grid
            {...{ name: 'generalAnchor' }}
            gap={12}
            columns={['1fr', '1fr', '1fr 1fr']}
            sx={{ width: '100%', ...mediaWidthTemplates.upToMedium({ width: 'unset' }) }}
          >
            <TokenInfo token={from} />
            <TokenInfo token={to} />
            <TokenScore token={from} />
            <TokenScore token={to} />
          </Grid>
        </Flex>
      </Flex>
      <Flex sx={{ bg: 'dark.500' }}>
        <ChartSection
          {...{ name: 'momentumAnchor' }}
          title={'MOMENTUM'}
          pair={{ from, to }}
          sx={{ width: 860, paddingX: 28, ...mediaWidthTemplates.upToMedium({ width: '100%', paddingX: 16 }) }}
        />
      </Flex>
      <Flex sx={{ bg: 'dark.500' }}>
        <ChartSection
          {...{ name: 'ownershipAnchor' }}
          title={'OWNERSHIP'}
          pair={{ from, to }}
          sx={{ width: 860, paddingX: 28, ...mediaWidthTemplates.upToMedium({ width: '100%', paddingX: 16 }) }}
        />
      </Flex>
      <Flex sx={{ bg: 'dark.500' }}>
        <ChartSection
          {...{ name: 'fundamentalAnchor' }}
          title={'FUNDAMENTAL'}
          pair={{ from, to }}
          sx={{ width: 860, paddingX: 28, ...mediaWidthTemplates.upToMedium({ width: '100%', paddingX: 16 }) }}
        />
      </Flex>
    </Flex>
  );
}
