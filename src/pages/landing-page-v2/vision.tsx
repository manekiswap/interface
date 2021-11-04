import { Flex, FlexProps, Heading, Text } from '@theme-ui/components';
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
    Green shoots of <b>E-commerce</b> <br />
    <b>Desktop</b> browser Access <br />
    Dedicated <b>Infrastructure</b>
  `,
  },
  {
    num: '5.9 Triliions',
    title: 'Web 2.0',
    description: `
    <b>Social</b> network <br />
    <b>Mobile-first</b>always on <br />
    <b>Cloud-driven</b> Computing
  `,
  },
  {
    num: '5.9 Triliions',
    title: 'Web 3.0',
    description: `
    <b>AI-driven</b> services <br />
    <b>Decentralized</b> data architecture <br />
    <b>Edge computing</b> infrastructure
  `,
  },
];

const Vision: React.FC<Props> = ({ maxContentWidth, className }) => {
  return (
    <Flex
      className={className}
      sx={{
        flexDirection: 'column',
        paddingY: 64,
        paddingX: 16,
        background: 'radial-gradient(44.01% 44.01% at 50% 50%, #F2F2EA 49.24%, #DCDDD4 81.02%)',
      }}
    >
      <Flex
        sx={{
          maxWidth: maxContentWidth,
          marginX: 'auto',
        }}
      >
        <Heading
          variant="h2"
          sx={{
            color: 'dark.500',
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
          Our vision
        </Heading>
      </Flex>
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: 48,
          textAlign: 'center',
          ...mediaWidthTemplates.upToSmall({
            flexDirection: 'column',
            alignItems: 'center',
          }),
        }}
      >
        {visions.map((v, idx) => (
          <React.Fragment key={v.title}>
            <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
              <div sx={{ background: '#24213D', padding: 24, paddingY: 18 }}>
                <Text
                  sx={{
                    fontSize: 20,
                    lineHeight: '28px',
                    color: 'yellow.300',
                    ...mediaWidthTemplates.upToMedium({
                      fontSize: 16,
                    }),
                  }}
                >
                  {v.num}
                </Text>
              </div>
              <Text
                sx={{
                  fontSize: 28,
                  lineHeight: '32px',
                  color: '#1D1D2D',
                  fontWeight: 700,
                  marginTop: 48,
                  ...mediaWidthTemplates.upToMedium({
                    fontSize: 20,
                  }),
                }}
              >
                {v.title}
              </Text>
              <Text
                as="p"
                sx={{
                  marginTop: 12,
                  fontSize: 16,
                  lineHeight: '24px',
                  color: 'dark.300',
                  ...mediaWidthTemplates.upToMedium({
                    fontSize: 14,
                    lineHeight: '20px',
                  }),
                }}
                dangerouslySetInnerHTML={{ __html: v.description }}
              ></Text>
            </Flex>
            {idx !== visions.length - 1 && (
              <div
                sx={{
                  width: 178,
                  height: 2,
                  backgroundColor: 'dark.transparent',
                  marginTop: 30,
                  ...mediaWidthTemplates.upToSmall({
                    height: 40,
                    width: '2px',
                    marginY: '16px',
                  }),
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
};

export default Vision;
