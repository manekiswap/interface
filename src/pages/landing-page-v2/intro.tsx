import { Flex, FlexProps, Grid, Heading, Text } from '@theme-ui/components';
import React from 'react';

import Intro1Img from '../../assets/images/landingV2/intro-1.png';
import Intro2Img from '../../assets/images/landingV2/intro-2.png';
import Intro3Img from '../../assets/images/landingV2/intro-3.png';
import IntroIcon from '../../assets/images/landingV2/intro-icon.svg';
import { mediaWidthTemplates } from '../../constants/media';
import DownArrow from './arrows/down-arrow';
import DownRightArrow from './arrows/down-right-arrow';
import LeftDownArrow from './arrows/left-down-arrow';
import RightArrow from './arrows/right-arrow';
import RightDownArrow from './arrows/right-down-arrow';
import UpRightArrow from './arrows/up-right-arrrow';

const DoubleRightArrow: React.FC<Omit<FlexProps, 'sx'>> = (props) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        '& svg': {
          width: '100%',
        },
      }}
      {...props}
    >
      <div sx={{ transform: 'translateY(16%)' }}>
        <UpRightArrow />
      </div>
      <div sx={{ transform: 'translateY(-16%)' }}>
        <DownRightArrow />
      </div>
    </Flex>
  );
};

const DoubleDownArrow: React.FC<Omit<FlexProps, 'sx'>> = (props) => {
  return (
    <Flex
      sx={{
        '& svg': {
          width: '100%',
        },
      }}
      {...props}
    >
      <div sx={{ width: '50%', transform: 'translateX(3%)' }}>
        <LeftDownArrow />
      </div>
      <div sx={{ width: '50%', transform: 'translateX(-3%)' }}>
        <RightDownArrow />
      </div>
    </Flex>
  );
};

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const features = [
  {
    name: 'Intelligence Dashboard',
    image: Intro1Img,
    description: `Envision, test and validate your ideas with quick wireframes and detailed mockups.
    Explore and iterate as your team builds momentum - moving seamlessly from lo-fi to hi-fi as your project evolves.`,
  },
  {
    name: 'Trading Protocol',
    image: Intro2Img,
    description: `Envision, test and validate your ideas with quick wireframes and detailed mockups.
    Explore and iterate as your team builds momentum - moving seamlessly from lo-fi to hi-fi as your project evolves.`,
  },
  {
    name: 'Research Environment',
    image: Intro3Img,
    description: `Envision, test and validate your ideas with quick wireframes and detailed mockups.
    Explore and iterate as your team builds momentum - moving seamlessly from lo-fi to hi-fi as your project evolves.`,
  },
];

const Intro: React.FC<Props> = ({ maxContentWidth }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        paddingX: 16,
        paddingTop: 154,
        paddingBottom: 84,
        alignItems: 'center',
        backgroundColor: '#110F26',
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
          }),
        }}
      >
        What is Maneki?
      </Heading>
      <Text
        as="p"
        sx={{
          fontSize: 20,
          lineHeight: '28px',
          fontWeight: 700,
          textAlign: 'center',
          color: 'white.200',
          maxWidth: 695,
          marginTop: 16,
          ...mediaWidthTemplates.upToMedium({
            fontSize: 16,
            lineHeight: '24px',
          }),
        }}
      >
        Trade directly from your wallet app. Unlike centralized exchanges like Binance or Coinbase, ManekiSwap doesn’t
        hold your funds when you trade, you have 100% ownership of your own wallet.
      </Text>
      <Grid
        sx={{
          marginTop: 50,
          maxWidth: maxContentWidth,
          marginX: 'auto',
          width: '100%',
          minHeight: 300,
          gridTemplateRows: '1fr 1fr 1fr 1fr',
          gridTemplateColumns: '1fr 1fr 1fr',
          columnGap: 80,
          rowGap: 36,
          color: 'black',
          ...mediaWidthTemplates.upToMedium({
            gridTemplateRows: 'auto auto auto',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            columnGap: 20,
            rowGap: 50,
          }),
        }}
      >
        <div
          sx={{
            gridRow: '2 / span 2',
            position: 'relative',
            ...mediaWidthTemplates.upToMedium({
              gridRow: 'auto',
              gridColumn: '2 / span 2',
            }),
            ...mediaWidthTemplates.upToSmall({
              gridColumn: '1 / span 4',
            }),
          }}
        >
          <div
            sx={{
              clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0 50%, 0 0)',
              height: '100%',
              backgroundColor: '#333243',
              padding: 24,
            }}
          >
            <Text
              as="p"
              sx={{
                color: 'white.400',
                fontSize: 20,
                lineHeight: '28px',
              }}
            >
              Digital Assets
            </Text>
            <Text
              as="p"
              sx={{
                color: 'white.300',
                fontSize: 16,
                lineHeight: '24px',
                marginTop: 12,
              }}
            >
              Defi, Real estate, Art + collectibles (NFT), cryptocurrency
            </Text>
          </div>
          <div
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              width: 80,
              color: 'yellow.300',
              transform: 'translate(100%, -50%)',
              '& svg': {
                width: '100%',
              },
              ...mediaWidthTemplates.upToMedium({
                display: 'none',
              }),
            }}
          >
            <RightArrow />
          </div>
          <div
            sx={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              color: 'yellow.300',
              display: 'none',
              transform: 'translate(-50%, 0%)',
              '& svg': {
                height: 50,
              },
              ...mediaWidthTemplates.upToMedium({
                display: 'flex',
              }),
            }}
          >
            <DownArrow />
          </div>
        </div>
        <div
          sx={{
            gridRow: '2 / span 2',
            position: 'relative',
            ...mediaWidthTemplates.upToMedium({
              gridRow: 'auto',
              gridColumn: '2/ span 2',
              marginBottom: 20,
            }),
            ...mediaWidthTemplates.upToSmall({
              gridColumn: '1/ span 4',
            }),
          }}
        >
          <div
            sx={{
              height: '100%',
              backgroundColor: '#333243',
              clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0 50%, 0 0)',
              padding: 24,
            }}
          >
            <Text
              as="p"
              sx={{
                color: 'white.400',
                fontSize: 20,
                lineHeight: '28px',
              }}
            >
              Investment Data Warehouse
            </Text>
            <Text
              as="p"
              sx={{
                color: 'white.300',
                fontSize: 16,
                lineHeight: '24px',
                marginTop: 12,
              }}
            >
              Gathering data from multiple projects and gengerating meaningful insights
            </Text>
          </div>
          <DoubleRightArrow
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              width: 80,
              color: 'yellow.300',
              transform: 'translate(100%, -50%)',
              ...mediaWidthTemplates.upToMedium({
                display: 'none',
              }),
            }}
          />
          <DoubleDownArrow
            sx={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              width: 300,
              color: 'yellow.300',
              transform: 'translate(-50%, -15%)',
              display: 'none',
              ...mediaWidthTemplates.upToMedium({
                display: 'flex',
              }),
            }}
          />
          {/* <div
            sx={{
              position: 'absolute',
              bottom: '50%',
              right: 0,
              width: 80,
              color: 'yellow.300',
              transform: 'translate(100%, 16%)',
              '& svg': {
                width: '100%',
              },
            }}
          >
            <UpRightArrow />
          </div>
          <div
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              width: 80,
              color: 'yellow.300',
              transform: 'translate(100%, -16%)',
              '& svg': {
                width: '100%',
              },
            }}
          >
            <DownRightArrow />
          </div> */}
        </div>
        <div
          sx={{
            backgroundColor: 'yellow.300',
            gridColumn: '3',
            gridRow: 'span 2',
            padding: 24,
            clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0 50%, 0 0)',
            ...mediaWidthTemplates.upToMedium({
              gridRow: '3 / span 1',
              gridColumn: '1/ span 2',
            }),
          }}
        >
          <Text
            as="p"
            sx={{
              color: 'dark.500',
              fontSize: 20,
              lineHeight: '28px',
            }}
          >
            API-first Product
          </Text>
          <Text
            as="p"
            sx={{
              color: 'dark.400',
              fontSize: 16,
              lineHeight: '24px',
              marginTop: 12,
            }}
          >
            Market intelligence and Exchange protocol features
          </Text>
        </div>
        <div
          sx={{
            backgroundColor: 'yellow.300',
            gridColumn: '3',
            gridRow: 'span 2',
            padding: 24,
            clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0 50%, 0 0)',
            ...mediaWidthTemplates.upToMedium({
              gridRow: '3 / span 1',
              gridColumn: '3/ span 2',
            }),
          }}
        >
          <Text
            as="p"
            sx={{
              color: 'dark.500',
              fontSize: 20,
              lineHeight: '28px',
            }}
          >
            Recommendation Engine
          </Text>
          <Text
            as="p"
            sx={{
              color: 'dark.400',
              fontSize: 16,
              lineHeight: '24px',
              marginTop: 12,
            }}
          >
            Back-test trade strategy to unlock opportunity
          </Text>
        </div>
      </Grid>
      <Grid
        sx={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
          width: '100%',
          maxWidth: maxContentWidth,
          marginTop: 64,
          ...mediaWidthTemplates.upToSmall({
            gridTemplateColumns: '1fr',
          }),
        }}
      >
        {features.map((f) => (
          <div
            key={f.name}
            sx={{
              paddingTop: 45,
              paddingX: 32,
              paddingBottom: 160,
              background: 'linear-gradient(180deg, #333243 0%, rgba(51, 50, 67, 0) 100%)',
              position: 'relative',
              isolation: 'isolate',
            }}
          >
            <IntroIcon sx={{ width: 170, position: 'absolute', top: 90, right: 0, zIndex: -1 }} />
            <img
              src={f.image}
              sx={{
                height: 89,
                ...mediaWidthTemplates.upToMedium({
                  height: 64,
                }),
              }}
            />
            <Heading
              variant="h4"
              sx={{
                fontSize: 28,
                lineHeight: '30px',
                color: 'white.400',
                marginTop: 50,
                ...mediaWidthTemplates.upToMedium({
                  fontSize: 16,
                  lineHeight: '24px',
                }),
              }}
            >
              {f.name}
            </Heading>
            <Text
              variant="body100"
              as="p"
              sx={{
                color: 'dark.100',
                marginTop: 16,
                ...mediaWidthTemplates.upToMedium({
                  fontSize: 12,
                  lineHeight: '20px',
                }),
              }}
            >
              {f.description}
            </Text>
          </div>
        ))}
      </Grid>
    </Flex>
  );
};

export default Intro;
