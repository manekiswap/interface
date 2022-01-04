import { PropsWithChildren, useState } from 'react';
import { Button, Flex, FlexProps, Grid, Heading, Image, Text } from 'theme-ui';

import IntroImg1 from '../../../assets/images/landing-v3/intro-1.png';
import IntroImg2 from '../../../assets/images/landing-v3/intro-2.png';
import IntroImg3 from '../../../assets/images/landing-v3/intro-3.png';
import IntroBg from '../../../assets/images/landing-v3/intro-bg.png';
import { mediaWidthTemplates } from '../../../constants/media';
import { useMediaQueryMaxWidth } from '../../../hooks/useMediaQuery';

type Props = Omit<FlexProps, 'sx'> & {
  maxContentWidth: number;
};

const section1Data = [
  {
    title: 'Digital Assets',
    description: 'Defi, Real estate, Art + collectibles (NFT), cryptocurrency',
  },
  {
    title: 'Investment Data Warehouse',
    description: 'Gathering data from multiple projects and gengerating meaningful insights',
  },
  {
    title: 'API-first Product',
    description: 'Market intelligence and Exchange protocol features',
  },
  {
    title: 'Recommendation Engine',
    description: 'Back-test trade strategy to unlock opportunity',
  },
];

const section2Data = [
  {
    title: 'Intelligence Dashboard',
    img: IntroImg1,
    description:
      'Maneki maintains the complete, active, and up-to-date crypto data in the world. We collect and aggregate crypto data from all major exchanges, mining pools, and other related sites. Our analysis platform makes it easy for you to find the trading context of blockchain data through on-chain, fundamental information.',
  },
  {
    title: 'Investment Protocol',
    img: IntroImg2,
    description:
      'Manekiswap is a decentralized crypto exchange protocol that enables users to safely and securely trade digital assets like Bitcoin and NFTs. Manekiswap has been designed to be an easy and intuitive trading platform. The platform aims to be as user-friendly as possible and allows anyone to join and use it without a fee.',
  },
  {
    title: 'Research Environment',
    img: IntroImg3,
    description: `Maneki is a blockchain API-first company. <br /><br />
      We build a set of APIs to address every part of the trading business cycle, allowing end users to adapt technology-first approach for their investing strategy. Our cloud infrastructure and developer tools make it seamlessly integrated to develop, deploy and scale investment ideas.`,
  },
];

function ChartTitle({ children }: PropsWithChildren<{}>) {
  return (
    <Text
      as="p"
      sx={{
        fontFamily: "'DM Mono', monospace",
        fontWeight: 500,
        fontSize: 18,
        lineHeight: '32px',
        color: '#18EBFB',
        ...mediaWidthTemplates.upToMedium({
          fontSize: 16,
        }),
      }}
    >
      {children}
    </Text>
  );
}

function MobileChart() {
  return (
    <div
      sx={{
        '& > *': {
          paddingBottom: 24,
          paddingLeft: 20,
        },
        '& > * > p:first-child': {
          marginBottom: 10,
        },
        '& > *:nth-child(n + 3)': {
          paddingLeft: 40,
        },
        '& > *:nth-child(n + 3) > *': {
          paddingLeft: 20,
        },
      }}
    >
      <div
        sx={{
          position: 'relative',
          '&::before': {
            height: '12px',
            width: '12px',
            content: '""',
            position: 'absolute',
            top: 16,
            left: 0,
            transform: 'translateY(-50%)',
            border: '2px solid #18EBFB',
            borderRadius: '50%',
          },
          '&::after': {
            height: `calc(100% - 30px)`,
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '6px',
            transform: 'translateX(-50%)',
            border: '1px solid #18EBFB',
          },
        }}
      >
        <ChartTitle>{section1Data[0].title}</ChartTitle>
        <Text
          as="p"
          sx={{
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {section1Data[0].description}
        </Text>
      </div>
      <div
        sx={{
          position: 'relative',
          '&::before': {
            height: '12px',
            width: '12px',
            content: '""',
            position: 'absolute',
            top: 16,
            left: 0,
            transform: 'translateY(-50%)',
            border: '2px solid #18EBFB',
            borderRadius: '50%',
          },
          '&::after': {
            height: `calc(100% - 30px)`,
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '6px',
            transform: 'translateX(-50%)',
            border: '1px solid #18EBFB',
          },
        }}
      >
        <ChartTitle>{section1Data[1].title}</ChartTitle>
        <Text
          as="p"
          sx={{
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {section1Data[1].description}
        </Text>
      </div>
      <div
        sx={{
          position: 'relative',
          '&::after': {
            height: `calc(100% + 16px)`,
            content: '""',
            position: 'absolute',
            top: 0,
            left: '6px',
            transform: 'translateX(-50%)',
            border: '1px solid #18EBFB',
          },
        }}
      >
        <div
          sx={{
            position: 'relative',
            '&::before': {
              height: '12px',
              width: '12px',
              content: '""',
              position: 'absolute',
              top: 16,
              left: 0,
              transform: 'translateY(-50%)',
              border: '2px solid #18EBFB',
              borderRadius: '50%',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 16,
              left: 0,
              transform: 'translate(calc(-100% - 2px), -50%)',
              border: '1px solid #18EBFB',
              width: 33,
            },
          }}
        >
          <ChartTitle>{section1Data[2].title}</ChartTitle>
          <Text
            as="p"
            sx={{
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {section1Data[2].description}
          </Text>
        </div>
      </div>
      <div>
        <div
          sx={{
            position: 'relative',
            '&::before': {
              height: '12px',
              width: '12px',
              content: '""',
              position: 'absolute',
              top: 16,
              left: 0,
              transform: 'translateY(-50%)',
              border: '2px solid #18EBFB',
              borderRadius: '50%',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 16,
              left: 0,
              transform: 'translate(calc(-100% - 2px), -50%)',
              border: '1px solid #18EBFB',
              width: 33,
            },
          }}
        >
          <ChartTitle>{section1Data[3].title}</ChartTitle>
          <Text
            as="p"
            sx={{
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {section1Data[3].description}
          </Text>
        </div>
      </div>
    </div>
  );
}

function DesktopChart() {
  return (
    <Grid
      sx={{
        gridTemplateColumns: '1fr 330px 1fr',
        gridTemplateRows: '1fr 60px 1fr',
        columnGap: 144,
        rowGap: 0,
      }}
    >
      <div
        sx={{
          paddingLeft: 30,
          paddingRight: 24,
          gridRow: '2 / span 2',
          gridColumn: '1 / span 1',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 16,
            left: 0,
            transform: 'translateY(-50%)',
            height: 14,
            width: 14,
            borderRadius: '50%',
            border: '2px solid #18EBFB',
          },
        }}
      >
        <ChartTitle>{section1Data[0].title}</ChartTitle>
        <Text
          as="p"
          sx={{
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {section1Data[0].description}
        </Text>
      </div>
      <div
        sx={{
          paddingLeft: 30,
          paddingRight: 24,
          gridRow: '2 / span 2',
          gridColumn: '2 / span 1',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 16,
            left: 0,
            transform: 'translateY(-50%)',
            height: 14,
            width: 14,
            borderRadius: '50%',
            border: '2px solid #18EBFB',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 16,
            left: 0,
            transform: 'translate(calc(-100% - 2px), -50%)',
            border: '1px solid #18EBFB',
            width: 140,
          },
        }}
      >
        <div
          sx={{
            position: 'absolute',
            top: 16,
            right: 0,
            transform: 'translate(calc(100%), -50%)',
            border: '1px solid #18EBFB',
            width: 70,
          }}
        />
        <ChartTitle>{section1Data[1].title}</ChartTitle>
        <Text
          as="p"
          sx={{
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {section1Data[1].description}
        </Text>
      </div>
      <div
        sx={{
          paddingLeft: 30,
          paddingRight: 24,
          gridRow: '1 / span 1',
          gridColumn: '3 / span 1',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 16,
            left: 0,
            transform: 'translateY(-50%)',
            height: 14,
            width: 14,
            borderRadius: '50%',
            border: '2px solid #18EBFB',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 16,
            left: 0,
            transform: 'translate(calc(-100% - 2px), -50%)',
            border: '1px solid #18EBFB',
            width: 70,
          },
        }}
      >
        <div
          sx={{
            position: 'absolute',
            top: 16,
            left: -74,
            transform: 'translate(0, 0)',
            border: '1px solid #18EBFB',
            height: `calc(100% + 60px)`,
          }}
        />
        <ChartTitle>{section1Data[2].title}</ChartTitle>
        <Text
          as="p"
          sx={{
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {section1Data[2].description}
        </Text>
      </div>
      <div
        sx={{
          paddingLeft: 30,
          paddingRight: 24,
          gridRow: '3 / span 1',
          gridColumn: '3 / span 1',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 16,
            left: 0,
            transform: 'translateY(-50%)',
            height: 14,
            width: 14,
            borderRadius: '50%',
            border: '2px solid #18EBFB',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 16,
            left: 0,
            transform: 'translate(calc(-100% - 2px), -50%)',
            border: '1px solid #18EBFB',
            width: 70,
          },
        }}
      >
        <ChartTitle>{section1Data[3].title}</ChartTitle>
        <Text
          as="p"
          sx={{
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {section1Data[3].description}
        </Text>
      </div>
    </Grid>
  );
}

function Card({ item }: { item: typeof section2Data[0] }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <Grid
      key={item.title}
      sx={{
        background: 'rgba(226, 108, 255, 0.08)',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        border: '2px solid #E26CFF',
        '&:hover .cardDescription': {
          opacity: 1,
        },
        '& > *': {
          padding: 24,
        },
        ...mediaWidthTemplates.upToMedium({
          gridTemplateRows: 'auto 1fr',
          paddingX: 12,
          paddingY: 32,
          '& > *': {
            padding: 0,
          },
        }),
        ...mediaWidthTemplates.upToSmall({
          paddingX: 16,
          paddingY: 24,
        }),
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          gridColumn: '1 / -1',
          gridRow: '1 / 2',
          alignItems: 'center',
          justifyContent: 'center',
          ...mediaWidthTemplates.upToSmall({
            alignItems: 'flex-start',
          }),
        }}
      >
        <img
          src={item.img}
          sx={{
            width: 200,
            height: 200,
            ...mediaWidthTemplates.upToSmall({
              width: 80,
              height: 80,
            }),
          }}
        />
        <Text
          as="p"
          sx={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            color: '#18EBFB',
            marginTop: 44,
            fontSize: 24,
            lineHeight: '32px',
            textAlign: 'center',
            ...mediaWidthTemplates.upToMedium({
              fontSize: 20,
              lineHeight: '28px',
              marginTop: 24,
              minHeight: 56,
            }),
            ...mediaWidthTemplates.upToSmall({
              marginTop: 16,
              minHeight: 0,
              textAlign: 'left',
            }),
          }}
        >
          {item.title}
        </Text>
      </Flex>
      <Flex
        className="cardDescription"
        sx={{
          flexDirection: 'column',
          gridColumn: '1 / -1',
          gridRow: '1 / -1',
          background: 'rgba(26, 15, 44, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: 24,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0,
          transition: '0.3s',
          color: 'white.400',
          ...mediaWidthTemplates.upToMedium({
            gridRow: '2 / -1',
            opacity: 1,
            background: 'none',
            backdropFilter: 'none',
            textAlign: 'center',
            color: 'white.300',
            justifyContent: 'flex-start',
            padding: 0,
            '& > *': {
              fontSize: 14,
              lineHeight: '18px',
            },
          }),
          ...mediaWidthTemplates.upToSmall({
            alignItems: 'flex-start',
            textAlign: 'left',
          }),
        }}
      >
        <Text
          as="p"
          sx={{
            fontFamily: "'DM Mono', monospace",
            ...mediaWidthTemplates.upToMedium(
              readMore
                ? {}
                : {
                    display: '-webkit-box',
                    WebkitLineClamp: '4',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  },
            ),
          }}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
        <Button
          variant="buttons.ghost"
          sx={{
            paddingX: 0,
            height: 'unset',
            fontFamily: "'DM Mono', monospace",
            fontSize: '14px',
            fontWeight: 'regular',
            display: 'none',
            ...mediaWidthTemplates.upToMedium({
              display: 'block',
              background: 'none',
              border: 'none',
              color: '#E26CFF',
              marginTop: 16,
            }),
          }}
          onClick={() => setReadMore((r) => !r)}
        >
          {readMore ? 'Hide' : 'Read more'}
        </Button>
      </Flex>
    </Grid>
  );
}

export default function Intro({ maxContentWidth, className }: Props) {
  const notDesktop = useMediaQueryMaxWidth('upToMedium');
  return (
    <Flex
      className={className}
      sx={{
        flexDirection: 'column',
        position: 'relative',
        isolation: 'isolate',
        paddingTop: 189,
        ...mediaWidthTemplates.upToMedium({
          paddingTop: 40,
        }),
      }}
    >
      <Image
        src={IntroBg}
        sx={{
          position: 'absolute',
          top: 40,
          left: 253,
          zIndex: -1,
          width: 1418,
          opacity: 0.5,
          ...mediaWidthTemplates.upToSmall({
            display: 'none',
          }),
        }}
      />
      <Grid
        sx={{
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto 1fr auto',
          columnGap: 65,
          rowGap: 16,
          maxWidth: maxContentWidth,
          marginX: 'auto',
          padding: 16,
          ...mediaWidthTemplates.upToSmall({
            gridTemplateColumns: '1fr',
          }),
        }}
      >
        <Heading
          variant="styles.h2"
          sx={{
            fontWeight: 500,
            fontSize: 56,
            lineHeight: '56px',
            color: 'white.400',
            ...mediaWidthTemplates.upToMedium({
              fontSize: 40,
              lineHeight: '48px',
            }),
            ...mediaWidthTemplates.upToSmall({
              textAlign: 'center',
            }),
          }}
        >
          What is Maneki?
        </Heading>
        <Text
          sx={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 20,
            lineHeight: '28px',
            color: 'rgba(226, 108, 255, 1)',
            ...mediaWidthTemplates.upToMedium({
              fontSize: 16,
              lineHeight: '24px',
            }),
            ...mediaWidthTemplates.upToSmall({
              textAlign: 'center',
            }),
          }}
        >
          Trade directly from your wallet app. Unlike centralized exchanges like Binance or Coinbase, Manekiswap doesn’t
          hold your funds when you trade, you have 100% ownership of your own wallet.
        </Text>
        <Flex
          sx={{
            marginTop: 40,
            color: 'white.300',
            gridColumn: '1 / -1',
            ...mediaWidthTemplates.upToMedium({
              marginTop: 0,
              gridRow: '1 / span 2',
              gridColumn: '2 / 3',
            }),
            ...mediaWidthTemplates.upToSmall({
              marginTop: '8px',
              gridRow: 'auto',
              gridColumn: '1',
            }),
          }}
        >
          {notDesktop ? <MobileChart /> : <DesktopChart />}
        </Flex>
        <Grid
          sx={{
            marginTop: 120,
            gridColumn: '1 / -1',
            gridTemplateColumns: 'repeat(3, 1fr)',
            ...mediaWidthTemplates.upToMedium({
              marginTop: 54,
              alignItems: 'start',
            }),
            ...mediaWidthTemplates.upToSmall({
              marginTop: 20,
              gridTemplateColumns: '1fr',
            }),
          }}
        >
          {section2Data.map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </Grid>
      </Grid>
    </Flex>
  );
}
