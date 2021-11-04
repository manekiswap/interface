import { Flex, FlexProps, Grid, Heading, Text } from '@theme-ui/components';
import React from 'react';

import HeroImg from '../../assets/images/landingV2/hero.png';
import HeroBackgroundImg from '../../assets/images/landingV2/hero-background.png';
import Logo from '../../assets/images/landingV2/logo.png';
import { mediaWidthTemplates } from '../../constants/media';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const Header: React.FC<Props> = ({ maxContentWidth }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        paddingTop: 40,
        backgroundColor: 'dark.500',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `linear-gradient(rgba(29, 29, 45, 0.7), rgba(29, 29, 45, 0.7)), linear-gradient(128.03deg, #FED93B -23.55%, #EEC14F 118.78%), url("${HeroBackgroundImg}")`,
        backgroundSize: '40%, 60% 100%, 50%',
        backgroundPosition: 'left, right, -25% bottom',
        position: 'relative',
        ...mediaWidthTemplates.upToSmall({
          backgroundSize: '100% 60%, 100% 40%, 100% 60%',
          backgroundPosition: 'top, bottom, top',
        }),
      }}
    >
      <div
        sx={{
          paddingX: 16,
        }}
      >
        <nav
          sx={{
            maxWidth: maxContentWidth,
            marginX: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <img
            sx={{
              width: 140,
            }}
            src={Logo}
            alt=""
          />
          <Grid
            sx={{
              gridAutoFlow: 'column',
              gap: 40,
            }}
          >
            <a
              href="#"
              sx={{
                textDecoration: 'none',
              }}
            >
              <Text
                variant="body200"
                sx={{
                  color: 'dark.500',
                }}
              >
                Product
              </Text>
            </a>
            <a
              href="#"
              sx={{
                textDecoration: 'none',
              }}
            >
              <Text
                variant="body200"
                sx={{
                  color: 'dark.500',
                }}
              >
                Roadmap
              </Text>
            </a>
            <a
              href="#"
              sx={{
                textDecoration: 'none',
              }}
            >
              <Text
                variant="body300"
                sx={{
                  color: 'white.400',
                  paddingX: 32,
                  paddingY: '8px',
                  backgroundColor: 'dark.500',
                }}
              >
                Visit App
              </Text>
            </a>
          </Grid>
        </nav>
        <Flex
          sx={{
            maxWidth: maxContentWidth,
            marginX: 'auto',
            width: '100%',
            marginTop: 57,
            marginBottom: 350,
            ...mediaWidthTemplates.upToLarge({
              marginBottom: 270,
            }),
            ...mediaWidthTemplates.upToSmall({
              marginBottom: 290,
            }),
            ...mediaWidthTemplates.upToExtraSmall({
              marginBottom: 160,
            }),
          }}
        >
          <div
            sx={{
              width: '40%',
              maxWidth: 496,
              ...mediaWidthTemplates.upToSmall({
                width: '100%',
                maxWidth: 'unset',
              }),
            }}
          >
            <Heading
              as="h1"
              sx={{
                fontSize: 76,
                fontWeight: 700,
                lineHeight: '90px',
                background: 'linear-gradient(#FFDE1F, #ECB902)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'yellow.300',
                ...mediaWidthTemplates.upToMedium({
                  fontSize: 48,
                  lineHeight: '56px',
                }),
              }}
            >
              Investment Intelligence Platform
            </Heading>
            <Text
              as="p"
              sx={{
                color: 'white.300',
                fontSize: 20,
                lineHeight: '28px',
                marginTop: 16,
                ...mediaWidthTemplates.upToMedium({
                  fontSize: 16,
                  lineHeight: '24px',
                }),
              }}
            >
              Guaranteed liquidity for millions of users and hundreds of Ethereum applications.
            </Text>
          </div>
        </Flex>
      </div>
      <img
        src={HeroImg}
        alt=""
        sx={{
          position: 'absolute',
          width: '55%',
          right: 0,
          top: 137,
          ...mediaWidthTemplates.upToSmall({
            display: 'block',
            position: 'static',
            width: 'calc(100% - 30px)',
            marginLeft: 30,
            transform: 'translateY(-50%)',
          }),
        }}
      />
      <div
        sx={{
          backgroundColor: 'dark.500',
          width: '100%',
          padding: 16,
        }}
      >
        <Grid
          sx={{
            gridTemplateColumns: '1fr auto',
            gap: 16,
            maxWidth: maxContentWidth,
            marginX: 'auto',
            ...mediaWidthTemplates.upToSmall({
              gridTemplateColumns: '1fr',
            }),
          }}
        >
          <Text
            variant="body200"
            sx={{
              color: 'white.300',
              ...mediaWidthTemplates.upToSmall({
                fontSize: 12,
              }),
            }}
          >
            Maneki Contract: --
          </Text>
          <a href="#" sx={{ textDecoration: 'none' }}>
            <Text variant="body300" sx={{ color: 'yellow.400' }}>
              See at Etherscan
            </Text>
          </a>
        </Grid>
      </div>
    </Flex>
  );
};

export default Header;
