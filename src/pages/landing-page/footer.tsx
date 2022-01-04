import { Flex, FlexProps, Grid, Link, Text } from 'theme-ui';

import { mediaWidthTemplates } from '../../constants/media';

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
            a: {
              textDecoration: 'none',
            },
            'a, span': {
              fontSize: 14,
              fontFamily: "'DM Mono', monospace",
              fontWeight: 'regular',
              lineHeight: '18px',
              color: 'white.300',
            },
            ...mediaWidthTemplates.upToSmall({
              gridTemplateColumns: 'repeat(4, auto) 1fr',
              gridTemplateRows: '1fr 1fr',
            }),
          }}
        >
          <Text
            sx={{
              ...mediaWidthTemplates.upToSmall({
                gridRow: '2',
                gridColumn: '1/-1',
              }),
            }}
          >
            Copyright © 2021 Maneki, Inc.
          </Text>
          <Link href="https://twitter.com/manekiswap" variant="buttons.link" target="_blank" rel="noreferrer">
            Twitter
          </Link>
          <Link href="https://github.com/manekiswap" variant="buttons.link" target="_blank" rel="noreferrer">
            Github
          </Link>
          <Link href="https://t.me/manekiswap" variant="buttons.link" target="_blank" rel="noreferrer">
            Telegram
          </Link>
          <Link href="https://info.manekiswap.com" variant="buttons.link" target="_blank" rel="noreferrer">
            More
          </Link>
        </Grid>
      </div>
    </Flex>
  );
}
