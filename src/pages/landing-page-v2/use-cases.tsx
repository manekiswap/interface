import { Flex, FlexProps, Grid, Heading, Text } from '@theme-ui/components';
import React from 'react';

import { mediaWidthTemplates } from '../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const useCases = [
  {
    title: 'Crypto traders',
    description: 'Envision, test and validate your ideas with quick wireframes and detailed mockups.',
  },
  {
    title: 'Finance Institutes',
    description: 'Envision, test and validate your ideas with quick wireframes and detailed mockups.',
  },
  {
    title: 'Investors',
    description: 'Envision, test and validate your ideas with quick wireframes and detailed mockups.',
  },
  {
    title: 'Progammers',
    description: 'Envision, test and validate your ideas with quick wireframes and detailed mockups.',
  },
];

const UseCases: React.FC<Props> = ({ maxContentWidth }) => {
  return (
    <Flex
      sx={{
        backgroundColor: '#DDDED5',
        color: 'dark.400',
        paddingY: 100,
        paddingX: 16,
      }}
    >
      <div
        sx={{
          maxWidth: maxContentWidth,
          marginX: 'auto',
        }}
      >
        <Heading
          variant="h2"
          sx={{
            color: '#5B5225',
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
          Use cases
        </Heading>
        <Text
          sx={{
            marginTop: '8px',
            fontWeight: 500,
            fontSize: 16,
            lineHeight: '24px',
            textAlign: 'center',
            maxWidth: 700,
            marginX: 'auto',
          }}
          as="p"
        >
          Envision, test and validate your ideas with quick wireframes and detailed mockups.
          <br />
          Explore and iterate as your team builds momentum - moving seamlessly from lo-fi to hifi
        </Text>
        <Grid
          sx={{
            gap: 48,
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginTop: 56,
            ...mediaWidthTemplates.upToMedium({
              gridTemplateColumns: 'repeat(2, 1fr)',
            }),
            ...mediaWidthTemplates.upToSmall({
              gridTemplateColumns: '1fr',
            }),
          }}
        >
          {useCases.map((u, idx) => (
            <Flex
              key={u.title}
              sx={{
                flexDirection: 'column',
                ...mediaWidthTemplates.upToMedium({
                  alignItems: 'center',
                }),
                ...mediaWidthTemplates.upToSmall({
                  flexDirection: 'row',
                  alignItems: 'baseline',
                }),
              }}
            >
              <Heading
                variant="h3"
                sx={{
                  fontSize: 40,
                  lineHeight: '48px',
                  color: '#5B5225',
                  ...mediaWidthTemplates.upToMedium({
                    fontSize: 28,
                    lineHeight: '32px',
                  }),
                }}
              >
                {idx + 1}.
              </Heading>
              <Flex
                sx={{
                  marginTop: 24,
                  flexDirection: 'column',
                  ...mediaWidthTemplates.upToMedium({
                    alignItems: 'center',
                  }),
                  ...mediaWidthTemplates.upToSmall({
                    alignItems: 'flex-start',
                    marginTop: 0,
                    marginLeft: 16,
                  }),
                }}
              >
                <Text
                  sx={{
                    fontSize: 20,
                    lineHeight: '28px',
                    fontWeight: 700,
                    color: '#5B5225',
                  }}
                >
                  {u.title}
                </Text>
                <Text
                  variant="body100"
                  sx={{
                    marginTop: 16,
                    ...mediaWidthTemplates.upToMedium({
                      textAlign: 'center',
                    }),
                    ...mediaWidthTemplates.upToSmall({
                      textAlign: 'left',
                    }),
                  }}
                >
                  {u.description}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </div>
    </Flex>
  );
};

export default UseCases;
