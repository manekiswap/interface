import { Flex, FlexProps, Grid, Heading } from '@theme-ui/components';
import React from 'react';

import { mediaWidthTemplates } from '../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const visions = [
  {
    num: '1.1 Triliions',
    title: 'Web 1.0',
    description: `
    Green shoots of <span>E-commerce</span> <br />
    <span>Desktop</span> browser Access <br />
    Dedicated <span>Infrastructure</span>
  `,
  },
  {
    num: '5.9 Triliions',
    title: 'Web 2.0',
    description: `
    <span>Social</span> network <br />
    <span>Mobile-first</span>always on <br />
    <span>Cloud-driven</span> Computing
  `,
  },
  {
    num: '5.9 Triliions',
    title: 'Web 3.0',
    description: `
    <span>AI-driven</span> services <br />
    <span>Decentralized</span> data architecture <br />
    <span>Edge computing</span> infrastructure
  `,
  },
];

const Vision: React.FC<Props> = ({ maxContentWidth }) => {
  return (
    <div
      sx={{
        paddingX: 16,
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: maxContentWidth,
          marginX: 'auto',
          textAlign: 'center',
        }}
      >
        <Heading
          variant="h2"
          sx={{
            fontSize: 56,
            lineHeight: '56px',
            color: 'white.400',
            textAlign: 'center',
            ...mediaWidthTemplates.upToMedium({
              fontSize: 40,
              lineHeight: '48px',
            }),
          }}
        >
          Our vision
        </Heading>
        <p
          sx={{
            marginTop: 16,
            maxWidth: 1000,
            marginX: 'auto',
            color: 'rgba(226, 108, 255, 1)',
            fontSize: 20,
            lineHeight: '28px',
            ...mediaWidthTemplates.upToMedium({
              fontSize: 16,
              lineHeight: '24px',
            }),
          }}
        >
          With the development of Digital Economy, we focus on the surging demand for data analytics in the industry.
          Blockchain is an important infrastructure in the Web3.0
        </p>
        <button
          sx={{
            background: 'none',
            border: 'none',
            marginTop: 16,
            fontSize: 16,
            color: '#18EBFB',
            cursor: 'pointer',
          }}
        >
          Read more
        </button>
        <Grid
          sx={{
            width: '100%',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 24,
            marginTop: 40,
            ...mediaWidthTemplates.upToMedium({
              gridTemplateColumns: 'repeat(4, 1fr)',
            }),
            ...mediaWidthTemplates.upToSmall({
              gridTemplateColumns: '1fr',
              marginTop: 16,
              gap: 12,
            }),
          }}
        >
          {visions.map((item, idx) => (
            <div
              sx={{
                padding: '32px 22px',
                border: '2px solid #E26CFF',
                background: 'rgba(226, 108, 255, 0.08)',
                ...mediaWidthTemplates.upToMedium({
                  gridColumnEnd: 'span 2',
                  gridColumnStart: idx === visions.length - 1 ? '2' : 'auto',
                  padding: '32px 42.5px',
                }),
                ...mediaWidthTemplates.upToSmall({
                  gridColumnStart: 'auto',
                  padding: '16px 20px',
                }),
              }}
              key={item.title}
            >
              <p
                sx={{
                  fontSize: 28,
                  lineHeight: '32px',
                  color: 'rgba(24, 235, 251, 1)',
                  ...mediaWidthTemplates.upToSmall({
                    fontSize: 24,
                  }),
                }}
              >
                {item.title}
              </p>
              <p
                sx={{
                  fontSize: 16,
                  lineHeight: '24px',
                  marginTop: 12,
                  color: 'white.200',
                  '& span': {
                    color: 'white.400',
                    fontWeight: 500,
                  },
                  ...mediaWidthTemplates.upToSmall({
                    fontSize: 14,
                    lineHeight: '18px',
                    marginTop: '8px',
                  }),
                }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <button
                sx={{
                  width: '100%',
                  marginTop: 24,
                  textAlign: 'center',
                  padding: '8px',
                  color: 'dark.500',
                  background: 'rgba(24, 235, 251, 1)',
                  border: 'none',
                  fontSize: 16,
                  lineHeight: '24px',
                  fontWeight: 500,
                  maxWidth: '280px',
                  ...mediaWidthTemplates.upToSmall({
                    marginTop: 12,
                  }),
                }}
              >
                {item.num}
              </button>
            </div>
          ))}
        </Grid>
      </Flex>
    </div>
  );
};

export default Vision;
