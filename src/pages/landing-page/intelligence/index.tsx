import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Text } from 'theme-ui';

import BottomBg from '../../../assets/images/landing-v3/bottom.png';
import BottomMobileBg from '../../../assets/images/landing-v3/bottom-mobile.png';
import BottomTabletBg from '../../../assets/images/landing-v3/bottom-tablet.png';
import GrowthSVG from '../../../assets/images/landing-v3/growth.svg';
import LockSVG from '../../../assets/images/landing-v3/lock.svg';
import SupportSVG from '../../../assets/images/landing-v3/support.svg';
import TargetSVG from '../../../assets/images/landing-v3/target.svg';
import { mediaWidthTemplates } from '../../../constants/media';
import routes from '../../../routes';
import Header from '../header';
import Footer from '../home/footer';

const innovations = [
  {
    title: 'Ready for Business',
    description: 'Get started with our ready-made AI strategy models to acclerate your business immedeiatly',
    icon: <TargetSVG />,
  },
  {
    title: 'Build in Minutes',
    description: 'Get started with our ready-made AI strategy models to acclerate your business immedeiatly',
    icon: <SupportSVG />,
  },
  {
    title: 'Secure and Scalable',
    description: 'Get started with our ready-made AI strategy models to acclerate your business immedeiatly',
    icon: <LockSVG />,
  },
];

const products = [
  {
    title: 'Crypto Trading',
    icon: <GrowthSVG />,
    url: routes.strategy,
  },
  {
    title: 'Product Insights',
  },
  {
    title: 'Competitor Benchmarking',
  },
  {
    title: 'Channel Recommendation',
  },
  {
    title: 'Stock Screener',
  },
  {
    title: 'Smart Portfolio',
  },
  {
    title: 'Feedback Sentiment',
  },
  {
    title: 'Strategies Benchmark',
  },
];

export default function IntelligencePage() {
  const [maxContentWidth] = useState(1224);
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Manekiswap | Marketplace</title>
        <link rel="canonical" href="https://manekiswap.com/#/product" />
      </Helmet>

      <Box
        sx={{
          background: '#0F0E44',
          paddingY: 100,
          overflow: 'hidden',
          ...mediaWidthTemplates.upToExtraLarge({
            paddingY: 0,
          }),
        }}
      >
        <Flex
          sx={{
            maxWidth: 1440,
            marginX: 'auto',
            flexDirection: 'column',
            background: '#151057',
            '*': {
              margin: 0,
              padding: 0,
              fontFamily: "'DM Mono', monospace",
              fontSize: 16,
              lineHeight: '24px',
            },
            '& *::before, & *::after': {
              boxSizing: 'border-box',
            },
          }}
        >
          <Header maxContentWidth={maxContentWidth} />
          <div
            sx={{
              background:
                'linear-gradient(179.99deg, #151057 0.01%, rgba(116, 46, 146, 0.27) 64.48%, rgba(169, 55, 206, 0) 90.86%, rgba(191, 61, 223, 0) 111.41%)',
            }}
          >
            <Flex
              sx={{
                alignSelf: 'center',
                maxWidth: maxContentWidth,
                flexDirection: 'column',
                marginTop: 180,
                paddingX: 16,
                marginX: 'auto',
              }}
            >
              <Flex sx={{ flexDirection: 'column', maxWidth: 884 }}>
                <Heading
                  sx={{
                    fontSize: 20,
                    lineHeight: '26px',
                    color: 'white.300',
                    fontFamily: "'DM Mono', monospace",
                    textTransform: 'uppercase',
                  }}
                >
                  Turn data into decisions
                </Heading>
                <Heading
                  sx={{
                    fontSize: 60,
                    lineHeight: '64px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(236.05deg, #18EBFB 9.43%, #D942FF 148.53%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Uncover investment and Marketing insights with
                </Heading>
                <Heading
                  sx={{
                    fontSize: 60,
                    lineHeight: '64px',
                    fontWeight: 'bold',
                    color: 'velvet.400',
                    marginBottom: 24,
                  }}
                >
                  Strategy AI Platform
                </Heading>
                <Text sx={{ fontSize: 20, lineHeight: '26px', color: 'white.300', fontFamily: "'DM Mono', monospace" }}>
                  Easily browse recommendation models that allow you to identify insights from the Financial, Ecommerce
                  data and more - for better marketing and investment decisions.
                </Text>
              </Flex>
              <Button
                variant="buttons.ghost"
                sx={{
                  alignSelf: 'flex-start',
                  backgroundColor: '6',
                  height: 44,
                  borderRadius: 'none',
                  color: 'white.300',
                  fontSize: 14,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 'regular',
                  paddingX: 24,
                  marginTop: 44,
                  marginBottom: 92,
                }}
              >
                BROWSE STRATEGIES
              </Button>
              <Text sx={{ fontSize: 20, lineHeight: '26px', color: 'white.300', fontFamily: "'DM Mono', monospace" }}>
                <Text as="span" sx={{ fontSize: 20, lineHeight: '26px', color: 'mint.300' }}>
                  100+ AI Use Cases
                </Text>{' '}
                Developed by Maneki Team.
              </Text>
              <Flex sx={{ marginY: 28 }}>
                {[0, 1, 2, 3].map((value) => {
                  return (
                    <Flex
                      key={`${value}`}
                      sx={{ height: 38, width: 120, backgroundColor: '#4428A2', marginRight: 40 }}
                    ></Flex>
                  );
                })}
              </Flex>
            </Flex>

            <Flex
              sx={{
                alignSelf: 'center',
                maxWidth: maxContentWidth,
                flexDirection: 'column',
                marginTop: 180,
                paddingX: 16,
                marginX: 'auto',
              }}
            >
              <Flex sx={{ flexDirection: 'column', maxWidth: 884 }}>
                <Heading
                  sx={{
                    fontSize: 20,
                    lineHeight: '26px',
                    color: '7',
                    fontFamily: "'DM Mono', monospace",
                    textTransform: 'uppercase',
                  }}
                >
                  Why Maneki Strategy?
                </Heading>
                <Heading variant="styles.h2" sx={{ marginTop: 16, marginBottom: 120 }}>
                  To accelerate innovation in Financial and Ecommerce sector with no-code{' '}
                  <Text
                    as="span"
                    variant="styles.h2"
                    sx={{
                      background:
                        'linear-gradient(236.05deg, rgba(24, 235, 251, 0.3) 9.43%, rgba(217, 66, 255, 0.3) 148.53%)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '100% 60%',
                      backgroundPosition: '0 90%',
                      mixBlendMode: 'lighten',
                    }}
                  >
                    AI Strategy platform.
                  </Text>
                </Heading>
              </Flex>
              <Flex>
                {innovations.map((innovation) => {
                  return (
                    <Flex key={innovation.title} sx={{ width: 316, flexDirection: 'column' }}>
                      {innovation.icon}
                      <Text
                        sx={{
                          fontSize: 24,
                          lineHeight: '36px',
                          color: 'mint.300',
                          fontFamily: "'DM Mono', monospace",
                          marginTop: 20,
                          marginBottom: 16,
                        }}
                      >
                        {innovation.title}
                      </Text>
                      <Text
                        sx={{
                          fontSize: 18,
                          lineHeight: '24px',
                          color: 'white.300',
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        {innovation.description}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>

            <Flex
              sx={{
                alignSelf: 'center',
                maxWidth: maxContentWidth,
                flexDirection: 'column',
                marginTop: 180,
                paddingX: 16,
                marginX: 'auto',
              }}
            >
              <Flex sx={{ flexDirection: 'column', maxWidth: 884 }}>
                <Heading
                  sx={{
                    fontSize: 20,
                    lineHeight: '26px',
                    color: '7',
                    fontFamily: "'DM Mono', monospace",
                    textTransform: 'uppercase',
                  }}
                >
                  Partner
                </Heading>
                <Heading variant="styles.h2" sx={{ marginTop: 16, marginBottom: 40 }}>
                  Our Partners
                </Heading>
                <Text sx={{ fontSize: 20, lineHeight: '26px', color: 'white.300', fontFamily: "'DM Mono', monospace" }}>
                  We have an extensive of partners so you can get the data, intergrations, and accuracy you need. From
                  Data Source, to Data Warehouse and Cloud AI, we’ve made sure your businesss model is ready to go.
                </Text>
              </Flex>
              <Button
                variant="buttons.ghost"
                sx={{
                  alignSelf: 'flex-start',
                  backgroundColor: '6',
                  height: 44,
                  borderRadius: 'none',
                  color: 'white.300',
                  fontSize: 14,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 'regular',
                  paddingX: 24,
                  marginTop: 44,
                  marginBottom: '8px',
                }}
              >
                Explore our Partners
              </Button>
              <Flex sx={{ marginY: 28 }}>
                {[0, 1, 2, 3].map((value) => {
                  return (
                    <Flex
                      key={`${value}`}
                      sx={{ height: 38, width: 120, backgroundColor: '#4428A2', marginRight: 40 }}
                    ></Flex>
                  );
                })}
              </Flex>
            </Flex>

            <Flex
              sx={{
                alignSelf: 'center',
                maxWidth: maxContentWidth,
                flexDirection: 'column',
                marginTop: 180,
                paddingX: 16,
                marginX: 'auto',
              }}
            >
              <Flex sx={{ flexDirection: 'column', maxWidth: 884 }}>
                <Heading
                  sx={{
                    fontSize: 20,
                    lineHeight: '26px',
                    color: '7',
                    fontFamily: "'DM Mono', monospace",
                    textTransform: 'uppercase',
                  }}
                >
                  AI marketplace
                </Heading>
                <Heading variant="styles.h2" sx={{ marginTop: 16, marginBottom: 40 }}>
                  Ready-made strategy for{' '}
                  <Text
                    as="span"
                    variant="styles.h2"
                    sx={{
                      background:
                        'linear-gradient(236.05deg, rgba(24, 235, 251, 0.3) 9.43%, rgba(217, 66, 255, 0.3) 148.53%)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '100% 60%',
                      backgroundPosition: '0 90%',
                      mixBlendMode: 'lighten',
                    }}
                  >
                    Financial & Marketing Services
                  </Text>{' '}
                  Services
                </Heading>
                <Text sx={{ fontSize: 20, lineHeight: '26px', color: 'white.300', fontFamily: "'DM Mono', monospace" }}>
                  Over 20 ready-made models are available for immediate deployment accross stock trading, crypto
                  trading, marketing and more.
                </Text>
              </Flex>
              <Button
                variant="buttons.ghost"
                sx={{
                  alignSelf: 'flex-start',
                  backgroundColor: '6',
                  height: 44,
                  borderRadius: 'none',
                  color: 'white.300',
                  fontSize: 14,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 'regular',
                  paddingX: 24,
                  marginTop: 44,
                  marginBottom: '8px',
                }}
              >
                Explore our Partners
              </Button>

              <Heading variant="styles.h4" sx={{ marginTop: 44, marginBottom: 24, color: 'mint.300' }}>
                AI usecases built for
              </Heading>
              <Box>
                {products.map((product) => {
                  return (
                    <Box key={product.title} sx={{ display: 'inline-block', marginRight: 24, marginBottom: 24 }}>
                      <Flex
                        sx={{
                          height: 228,
                          width: 268,
                          flexDirection: 'column',
                          backgroundColor: product.url ? '#5B3EBC' : 'rgba(130, 97, 243, 0.5)',
                          opacity: product.url ? 1 : 0.5,
                          paddingTop: 24,
                          paddingBottom: 16,
                          paddingX: 16,
                        }}
                      >
                        <Flex sx={{ flexDirection: 'column' }}>
                          {product.url ? (
                            product.icon
                          ) : (
                            <Flex sx={{ height: 78, width: 78, backgroundColor: '#3C2886' }} />
                          )}
                          <Text
                            sx={{
                              fontSize: 16,
                              fontFamily: "'DM Mono', monospace",
                              lineHeight: '20px',
                              marginTop: 24,
                              marginBottom: 16,
                              color: 'white.400',
                            }}
                          >
                            {product.title}
                          </Text>
                          <Flex sx={{ backgroundColor: 'rgba(231, 234, 255, 0.2)', height: '1px' }} />
                        </Flex>
                        <Button
                          variant="buttons.link"
                          disabled={!product.url}
                          sx={{
                            alignSelf: 'flex-start',
                            marginTop: 24,
                            fontSize: 14,
                            fontFamily: "'DM Mono', monospace",
                            fontWeight: 'regular',
                            height: 'unset',
                            padding: 0,
                            textDecoration: 'none',
                            color: 'rgb(24, 235, 251)',
                            textTransform: 'uppercase',
                          }}
                          onClick={() => {
                            !!product.url && navigate(product.url);
                          }}
                        >
                          {product.url ? 'Explore' : 'Comming soon'}
                        </Button>
                      </Flex>
                    </Box>
                  );
                })}
              </Box>
            </Flex>
          </div>

          <Flex
            sx={{
              flexDirection: 'column',
              height: 502,
              // background:
              //   'linear-gradient(180deg, #452898 0%, rgba(69, 40, 152, 0) 72.59%, rgba(186, 76, 214, 0.841734) 100%)',
              background: `url("${BottomBg}") no-repeat center bottom/cover`,
              ...mediaWidthTemplates.upToMedium({
                backgroundImage: `url("${BottomTabletBg}")`,
              }),
              ...mediaWidthTemplates.upToSmall({
                backgroundImage: `url("${BottomMobileBg}")`,
              }),
            }}
          >
            <Footer sx={{ marginTop: 'auto' }} maxContentWidth={maxContentWidth} />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
