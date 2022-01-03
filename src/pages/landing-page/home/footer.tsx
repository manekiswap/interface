import { Flex, FlexProps, Grid } from 'theme-ui';

import { mediaWidthTemplates } from '../../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

export default function Footer({ maxContentWidth, className }: Props) {
  return (
    <Flex className={className} sx={{ flexDirection: 'column' }}>
      <div
        sx={{
          paddingY: 20,
          paddingX: 16,
        }}
      >
        <Grid
          sx={{
            gridTemplateColumns: '1fr auto auto auto auto',
            gap: 24,
            maxWidth: maxContentWidth,
            marginX: 'auto',
            '& a': {
              textDecoration: 'none',
            },
            fontSize: 14,
            lineHeight: '18px',
            ...mediaWidthTemplates.upToSmall({
              gridTemplateColumns: 'repeat(4, auto) 1fr',
              gridTemplateRows: '1fr 1fr',
            }),
          }}
        >
          <p
            sx={{
              color: 'white.300',
              ...mediaWidthTemplates.upToSmall({
                gridRow: '2',
                gridColumn: '1/-1',
              }),
            }}
          >
            Copyright © 2021 Maneki, Inc.
          </p>
          <a href="https://twitter.com/manekiswap">
            <p
              sx={{
                color: 'white.300',
              }}
            >
              Twitter
            </p>
          </a>
          <a href="https://github.com/manekiswap">
            <p
              sx={{
                color: 'white.300',
              }}
            >
              Github
            </p>
          </a>
          <a href="https://t.me/manekiswap">
            <p
              sx={{
                color: 'white.300',
              }}
            >
              Telegram
            </p>
          </a>
          <a href="https://info.manekiswap.com">
            <p
              sx={{
                color: 'white.300',
              }}
            >
              More
            </p>
          </a>
        </Grid>
      </div>
    </Flex>
  );
}
