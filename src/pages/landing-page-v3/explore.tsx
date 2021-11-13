import { Flex, FlexProps, Grid, Heading } from '@theme-ui/components';
import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

import ExploreImg from '../../assets/images/landing-v3/explore.png';
import Explore1Img from '../../assets/images/landing-v3/explore-1.png';
import { mediaWidthTemplates } from '../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const Explore: React.FC<Props> = ({ maxContentWidth, className }) => {
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
          gridTemplateColumns: 'auto 1fr',
          gap: 74,
          maxWidth: maxContentWidth,
          marginX: 'auto',
          width: '100%',
          ...mediaWidthTemplates.upToMedium({
            gridTemplateColumns: '1fr',
            gap: 32,
          }),
          ...mediaWidthTemplates.upToSmall({
            gap: 20,
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
            maxWidth: 400,
            ...mediaWidthTemplates.upToMedium({
              fontSize: 40,
              lineHeight: '48px',
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
              background: 'rgba(226, 108, 255, 0.08)',
              padding: 40,
              border: '2px solid #E26CFF',
              position: 'relative',
              overflow: 'hidden',
              ...mediaWidthTemplates.upToSmall({
                paddingX: 16,
                paddingTop: 24,
                paddingBottom: 0,
              }),
            }}
          >
            <Heading
              variant="h4"
              sx={{
                fontWeight: 500,
                fontSize: 28,
                lineHeight: '32px',
                color: 'rgba(226, 108, 255, 1)',
                ...mediaWidthTemplates.upToSmall({
                  fontSize: 20,
                  lineHeight: '28px',
                }),
              }}
            >
              DEX Platform
            </Heading>
            <p
              sx={{
                color: 'white.300',
                fontSize: 16,
                lineHeight: '24px',
                maxWidth: '50%',
                marginTop: '8px',
                ...mediaWidthTemplates.upToSmall({
                  maxWidth: '100%',
                }),
              }}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            </p>
            <a
              href="#"
              sx={{
                display: 'flex',
                padding: 16,
                backgroundColor: 'dark.500',
                color: 'dark.500',
                alignSelf: 'start',
                textDecoration: 'none',
                marginTop: 80,
                alignItems: 'center',
                background: 'rgba(24, 235, 251, 1)',
                ...mediaWidthTemplates.upToSmall({
                  marginTop: 12,
                }),
              }}
            >
              <p
                sx={{
                  fontSize: 16,
                  lineHeight: '24px',
                }}
              >
                Explore more
              </p>
              <FiArrowUpRight
                sx={{
                  marginLeft: '8px',
                  width: 24,
                  height: 24,
                }}
              />
            </a>
            <div
              sx={{
                position: 'absolute',
                bottom: 0,
                top: 40,
                right: 0,
                // width: '70%',
                left: '50%',
                ...mediaWidthTemplates.upToSmall({
                  display: 'none',
                }),
              }}
            >
              <img
                src={Explore1Img}
                alt=""
                sx={{
                  // position: 'absolute',
                  // bottom: 0,
                  // top: 40,
                  // right: 0,
                  // // width: '70%',
                  // left: '30%',
                  // ...mediaWidthTemplates.upToSmall({
                  //   display: 'none',
                  // }),
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            <img
              src={ExploreImg}
              alt=""
              sx={{
                width: '100%',
                display: 'none',
                ...mediaWidthTemplates.upToSmall({
                  display: 'block',
                }),
              }}
            />
          </Flex>
          <Flex
            sx={{
              padding: 40,
              background: 'rgba(133, 41, 251, 0.15)',
              marginTop: 24,
              justifyContent: 'space-between',
              ...mediaWidthTemplates.upToSmall({
                flexDirection: 'column',
                marginTop: 16,
                padding: 16,
              }),
            }}
          >
            <div>
              <Heading
                variant="h4"
                sx={{
                  fontWeight: 500,
                  fontSize: 28,
                  lineHeight: '32px',
                  color: '#18EBFB',
                  ...mediaWidthTemplates.upToMedium({
                    fontSize: 20,
                    lineHeight: '28px',
                  }),
                }}
              >
                Blockchain Intelligence
              </Heading>
              <p
                sx={{
                  color: 'white.300',
                  maxWidth: 369,
                  marginTop: '8px',
                  fontSize: 16,
                  lineHeight: '24px',
                }}
              >
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              </p>
            </div>
            <p
              sx={{
                textTransform: 'uppercase',
                padding: 12,
                paddingX: 24,
                color: 'white.300',
                backgroundColor: '#8261F3',
                fontWeight: 500,
                alignSelf: 'flex-start',
                fontSize: 14,
                lineHeight: '20px',
                flexShrink: 0,
                ...mediaWidthTemplates.upToSmall({
                  marginTop: '12px',
                }),
              }}
            >
              Coming soon
            </p>
          </Flex>
          <Flex
            sx={{
              padding: 40,
              background: 'rgba(133, 41, 251, 0.15)',
              marginTop: 24,
              justifyContent: 'space-between',
              ...mediaWidthTemplates.upToSmall({
                flexDirection: 'column',
                marginTop: 16,
                padding: 16,
              }),
            }}
          >
            <div>
              <Heading
                variant="h4"
                sx={{
                  fontWeight: 500,
                  fontSize: 28,
                  lineHeight: '32px',
                  color: '#18EBFB',
                  ...mediaWidthTemplates.upToMedium({
                    fontSize: 20,
                    lineHeight: '28px',
                  }),
                }}
              >
                NFT Exchange
              </Heading>
              <p
                sx={{
                  color: 'white.300',
                  maxWidth: 369,
                  marginTop: '8px',
                  fontSize: 16,
                  lineHeight: '24px',
                }}
              >
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              </p>
            </div>
            <p
              sx={{
                textTransform: 'uppercase',
                padding: 12,
                paddingX: 24,
                color: 'white.300',
                backgroundColor: '#8261F3',
                fontWeight: 500,
                alignSelf: 'flex-start',
                fontSize: 14,
                lineHeight: '20px',
                flexShrink: 0,
                ...mediaWidthTemplates.upToSmall({
                  marginTop: '12px',
                }),
              }}
            >
              Coming soon
            </p>
          </Flex>
        </div>
      </Grid>
    </Flex>
  );
};

export default Explore;
