import { Flex, FlexProps, Grid, Heading, Text } from '@theme-ui/components';
import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

import { mediaWidthTemplates } from '../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const Explore: React.FC<Props> = ({ maxContentWidth }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        backgroundColor: '#110F26',
        paddingTop: 110,
        paddingBottom: 80,
        paddingX: 16,
      }}
    >
      <Grid
        sx={{
          gridTemplateColumns: 'auto 1fr',
          gap: 100,
          maxWidth: maxContentWidth,
          marginX: 'auto',
          width: '100%',
          ...mediaWidthTemplates.upToMedium({
            gridTemplateColumns: '1fr',
            gap: 24,
          }),
        }}
      >
        <Heading
          variant="h2"
          sx={{
            color: 'white.400',
            fontWeight: 700,
            fontSize: 48,
            lineHeight: '56px',
            maxWidth: 400,
            ...mediaWidthTemplates.upToMedium({
              fontSize: 32,
              lineHeight: '32px',
              textAlign: 'center',
              maxWidth: 'unset',
            }),
          }}
        >
          Explore Maneki Products
        </Heading>
        <div>
          <Flex
            sx={{
              flexDirection: 'column',
              background: 'linear-gradient(132.75deg, #FFDE1F -27.31%, #ECB902 132.31%)',
              padding: 40,
            }}
          >
            <Heading
              variant="h4"
              sx={{
                fontSize: 28,
                lineHeight: '32px',
                color: '#000000',
                ...mediaWidthTemplates.upToMedium({
                  fontSize: 20,
                  lineHeight: '28px',
                }),
              }}
            >
              DEX Platform
            </Heading>
            <Text
              as="p"
              sx={{
                color: 'dark.300',
                fontSize: 20,
                lineHeight: '28px',
                maxWidth: 369,
                fontWeight: 500,
                marginTop: '8px',
                ...mediaWidthTemplates.upToMedium({
                  fontSize: 16,
                  lineHeight: '24px',
                }),
              }}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            </Text>
            <a
              href="#"
              sx={{
                display: 'flex',
                paddingX: 22,
                paddingY: 16,
                backgroundColor: 'dark.500',
                color: 'white.400',
                alignSelf: 'start',
                textDecoration: 'none',
                marginTop: 80,
                alignItems: 'center',
              }}
            >
              <Text
                sx={{
                  fontSize: 16,
                  lineHeight: '24px',
                  fontWeight: 700,
                }}
              >
                Explore more
              </Text>
              <FiArrowUpRight
                sx={{
                  marginLeft: '8px',
                  width: 24,
                  height: 24,
                }}
              />
            </a>
          </Flex>
          <Flex
            sx={{
              padding: 40,
              background: 'linear-gradient(94.27deg, #333243 -24.99%, #1A1A26 124.31%)',
              marginTop: 24,
              justifyContent: 'space-between',
              ...mediaWidthTemplates.upToSmall({
                flexDirection: 'column',
              }),
            }}
          >
            <div>
              <Heading
                variant="h4"
                sx={{
                  fontSize: 28,
                  lineHeight: '32px',
                  color: 'yellow.400',
                  ...mediaWidthTemplates.upToMedium({
                    fontSize: 20,
                    lineHeight: '28px',
                  }),
                }}
              >
                Blockchain Intelligence
              </Heading>
              <Text
                as="p"
                sx={{
                  color: 'white.200',
                  fontSize: 20,
                  lineHeight: '28px',
                  maxWidth: 369,
                  fontWeight: 500,
                  marginTop: '8px',
                  ...mediaWidthTemplates.upToMedium({
                    fontSize: 16,
                    lineHeight: '24px',
                  }),
                }}
              >
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              </Text>
            </div>
            <Text
              sx={{
                textTransform: 'uppercase',
                padding: 12,
                paddingX: 24,
                color: 'white.300',
                backgroundColor: 'dark.transparent',
                fontWeight: 700,
                alignSelf: 'flex-start',
                borderRadius: '999px',
                fontSize: 12,
                lineHeight: '20px',
                flexShrink: 0,
                ...mediaWidthTemplates.upToSmall({
                  marginTop: '8px',
                }),
              }}
            >
              Coming soon
            </Text>
          </Flex>
          <Flex
            sx={{
              padding: 40,
              background: 'linear-gradient(94.27deg, #333243 -24.99%, #1A1A26 124.31%)',
              marginTop: 24,
              justifyContent: 'space-between',
              ...mediaWidthTemplates.upToSmall({
                flexDirection: 'column',
              }),
            }}
          >
            <div>
              <Heading
                variant="h4"
                sx={{
                  fontSize: 28,
                  lineHeight: '32px',
                  color: 'yellow.400',
                  ...mediaWidthTemplates.upToMedium({
                    fontSize: 20,
                    lineHeight: '28px',
                  }),
                }}
              >
                NFT Exchange
              </Heading>
              <Text
                as="p"
                sx={{
                  color: 'white.200',
                  fontSize: 20,
                  lineHeight: '28px',
                  maxWidth: 369,
                  fontWeight: 500,
                  marginTop: '8px',
                  ...mediaWidthTemplates.upToMedium({
                    fontSize: 16,
                    lineHeight: '24px',
                  }),
                }}
              >
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              </Text>
            </div>
            <Text
              sx={{
                textTransform: 'uppercase',
                padding: 12,
                paddingX: 24,
                color: 'white.300',
                backgroundColor: 'dark.transparent',
                fontWeight: 700,
                alignSelf: 'flex-start',
                borderRadius: '999px',
                fontSize: 12,
                lineHeight: '20px',
                flexShrink: 0,
                ...mediaWidthTemplates.upToSmall({
                  marginTop: '8px',
                }),
              }}
            >
              Coming soon
            </Text>
          </Flex>
        </div>
      </Grid>
    </Flex>
  );
};

export default Explore;
