import { Flex, FlexProps, Grid, Heading } from '@theme-ui/components';
import React from 'react';

import { mediaWidthTemplates } from '../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const Partners: React.FC<Props> = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        paddingY: 80,
        paddingX: 16,
        backgroundColor: '#1E1C32',
      }}
    >
      <Heading
        variant="h2"
        sx={{
          color: 'white.400',
          fontWeight: 700,
          fontSize: 48,
          lineHeight: '56px',
          textAlign: 'center',
          ...mediaWidthTemplates.upToMedium({
            fontSize: 32,
            lineHeight: '32px',
          }),
        }}
      >
        Our Partners
      </Heading>
      <Grid gap={40} sx={{ gridAutoFlow: 'column', overflow: 'auto', marginTop: 48 }}>
        {Array(10)
          .fill(null)
          .map((_, idx) => (
            <div
              key={idx}
              sx={{
                width: 223,
                height: 109,
                backgroundColor: '#353546',
              }}
            ></div>
          ))}
      </Grid>
    </Flex>
  );
};

export default Partners;
