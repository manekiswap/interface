import { Flex, FlexProps, Grid, Heading, Text } from 'theme-ui';

import { mediaWidthTemplates } from '../../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const data = [
  {
    title: 'Crypto traders',
    description: 'Analyze blockchain projects and follow the money through the chain',
  },
  {
    title: 'Finance Institutes',
    description: 'Access traceable data to identify trends, analyze risks',
  },
  {
    title: 'Investors',
    description: 'Monitor numerous blockchain projects & publications to identify investment opportunities',
  },
  {
    title: 'Developers',
    description: 'We support API and tools for startup and solo developers to build new their services',
  },
];

export default function UseCases({ maxContentWidth, className }: Props) {
  return (
    <Flex
      className={className}
      sx={{
        flexDirection: 'column',

        paddingX: 16,
      }}
    >
      <Grid
        sx={{
          maxWidth: maxContentWidth,
          width: '100%',
          marginX: 'auto',
          gridTemplateColumns: '400px 1fr',
          gap: 74,
          ...mediaWidthTemplates.upToMedium({
            gridTemplateColumns: '1fr',
            gap: 16,
          }),
        }}
      >
        <Heading
          variant="h2"
          sx={{
            color: 'white.400',
            fontWeight: 500,
            fontSize: 48,
            lineHeight: '56px',
            ...mediaWidthTemplates.upToMedium({
              fontSize: 40,
              lineHeight: '48px',
              maxWidth: 'unset',
            }),
          }}
        >
          Use cases
        </Heading>
        <div>
          <Text
            as="p"
            sx={{
              color: 'rgba(226, 108, 255, 1)',
              fontFamily: "'DM Mono', monospace",
              fontSize: 20,
              lineHeight: '28px',
              ...mediaWidthTemplates.upToMedium({
                fontSize: 16,
                lineHeight: '24px',
              }),
            }}
          >
            Blockchain data is useful for many verticles such as Finance, Crypto Trading, Blockchain Forensics,
            Scientific Data Processing & Analysis, Decentralized Finance (DeFi), Collectibles NFTs, and Digitized
            Securities.
          </Text>
          <Grid
            sx={{
              marginTop: 44,
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              color: 'rgba(24, 235, 251, 1)',
              ...mediaWidthTemplates.upToMedium({
                marginTop: 31,
                columnGap: 64,
                rowGap: 40,
              }),
              ...mediaWidthTemplates.upToSmall({
                marginTop: 20,
                gridTemplateColumns: '1fr',
                rowGap: 24,
              }),
            }}
          >
            {data.map((item, idx) => (
              <div key={item.title}>
                <Text
                  as="p"
                  sx={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 40,
                    fontWeight: 'medium',
                    lineHeight: '48px',
                    ...mediaWidthTemplates.upToSmall({
                      fontSize: 24,
                    }),
                  }}
                >
                  {idx + 1}.
                </Text>
                <Text
                  as="p"
                  sx={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 20,
                    lineHeight: '28px',
                    marginTop: 16,
                    ...mediaWidthTemplates.upToSmall({
                      marginTop: '8px',
                    }),
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  as="p"
                  sx={{
                    fontFamily: "'DM Mono', monospace",
                    color: 'white.400',
                    marginTop: 16,
                    ...mediaWidthTemplates.upToSmall({
                      marginTop: '8px',
                    }),
                  }}
                >
                  {item.description}
                </Text>
              </div>
            ))}
          </Grid>
        </div>
      </Grid>
    </Flex>
  );
}
