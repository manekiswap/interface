import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Image, Text } from 'theme-ui';

import FooterSVG from '../../../assets/images/landing-v3/footer.svg';
import { ReactComponent as GrowthSVG } from '../../../assets/images/landing-v3/growth.svg';
import { ReactComponent as LockSVG } from '../../../assets/images/landing-v3/lock.svg';
import PartnerAirbyte from '../../../assets/images/landing-v3/partner-airbyte.png';
import PartnerGC from '../../../assets/images/landing-v3/partner-gc.png';
import PartnerSantiment from '../../../assets/images/landing-v3/partner-santiment.png';
import PartnerTradologics from '../../../assets/images/landing-v3/partner-tradologics-2.png';
import { ReactComponent as SupportSVG } from '../../../assets/images/landing-v3/support.svg';
import { ReactComponent as TargetSVG } from '../../../assets/images/landing-v3/target.svg';
import { mediaWidthTemplates } from '../../../constants/media';
import routes from '../../../routes';
import Footer from '../footer';
import Header from '../header';

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

const maxContentWidth = 1256;

export default function IntelligencePage() {
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
          }}
        >
          <Header maxContentWidth={maxContentWidth - 32} />
          <Flex
            sx={{
              flexDirection: 'column',
              background:
                'linear-gradient(179.99deg, #151057 0.01%, rgba(116, 46, 146, 0.27) 64.48%, rgba(169, 55, 206, 0) 90.86%, rgba(191, 61, 223, 0) 111.41%)',
            }}
          >
            <Flex
              sx={{
                width: '100%',
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
                disabled={true}
                sx={{
                  alignSelf: 'flex-start',
                  height: 44,
                  borderRadius: 'none',
                  fontSize: 14,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 'regular',
                  paddingX: 24,
                  marginTop: 44,
                  marginBottom: 92,
                  '&:disabled,&[disabled]': {
                    cursor: 'not-allowed',
                    backgroundColor: '6',
                    color: 'white.300',
                  },
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
              <Box sx={{ marginTop: 28, marginBottom: '4px' }}>
                {['Crypto Trading', 'Stock Trading', 'Marketing Automation', 'Performance Optimization'].map(
                  (value) => {
                    return (
                      <Box key={`${value}`} sx={{ display: 'inline-block', marginRight: 40, marginBottom: 24 }}>
                        <Flex
                          sx={{
                            height: 38,
                            paddingX: 16,
                            alignItems: 'center',
                            backgroundColor: '#4428A2',
                          }}
                        >
                          <Text sx={{ color: 'white.400' }}>{value}</Text>
                        </Flex>
                      </Box>
                    );
                  },
                )}
              </Box>
            </Flex>

            <Flex
              sx={{
                width: '100%',
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
              <Box sx={{ marginBottom: 128 }}>
                {innovations.map((innovation) => {
                  return (
                    <Box key={innovation.title} sx={{ display: 'inline-block', marginRight: 68, marginBottom: 32 }}>
                      <Flex sx={{ width: 316, flexDirection: 'column' }}>
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
                    </Box>
                  );
                })}
              </Box>
            </Flex>
          </Flex>

          <Flex
            sx={{
              flexDirection: 'column',
              background:
                'linear-gradient(180deg, #452898 0%, rgba(69, 40, 152, 0) 72.59%, rgba(186, 76, 214, 0.841734) 100%)',
            }}
          >
            <Flex
              sx={{
                width: '100%',
                maxWidth: maxContentWidth,
                flexDirection: 'column',
                marginTop: 128,
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
                disabled={true}
                sx={{
                  alignSelf: 'flex-start',
                  height: 44,
                  borderRadius: 'none',
                  fontSize: 14,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 'regular',
                  paddingX: 24,
                  marginTop: 44,
                  marginBottom: '8px',
                  '&:disabled,&[disabled]': {
                    cursor: 'not-allowed',
                    backgroundColor: '6',
                    color: 'white.300',
                  },
                }}
              >
                Explore our Partners
              </Button>
              <Box sx={{ marginTop: 28, marginBottom: '4px' }}>
                {[PartnerAirbyte, PartnerSantiment, PartnerGC, PartnerTradologics].map((value) => {
                  return (
                    <Box
                      key={`${value}`}
                      sx={{ display: 'inline-block', marginRight: 40, marginBottom: 24, height: 48 }}
                    >
                      <Image src={value} sx={{ verticalAlign: 'middle' }} />
                    </Box>
                  );
                })}
              </Box>
            </Flex>

            <Flex
              sx={{
                width: '100%',
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
                disabled={true}
                sx={{
                  alignSelf: 'flex-start',
                  height: 44,
                  borderRadius: 'none',
                  fontSize: 14,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 'regular',
                  paddingX: 24,
                  marginTop: 44,
                  marginBottom: '8px',
                  '&:disabled,&[disabled]': {
                    cursor: 'not-allowed',
                    backgroundColor: '6',
                    color: 'white.300',
                  },
                }}
              >
                Explore Marketplace
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

            <Flex
              sx={{
                flexDirection: 'column',
                height: 502,
                width: '100%',
                background: `url("${FooterSVG}") no-repeat center bottom/cover`,
                backgroundSize: '100%',
              }}
            >
              <Footer sx={{ marginTop: 'auto' }} maxContentWidth={maxContentWidth} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
