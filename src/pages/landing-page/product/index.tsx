import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Heading, Text } from 'theme-ui';

import BottomBg from '../../../assets/images/landing-v3/bottom.png';
import BottomMobileBg from '../../../assets/images/landing-v3/bottom-mobile.png';
import BottomTabletBg from '../../../assets/images/landing-v3/bottom-tablet.png';
import { mediaWidthTemplates } from '../../../constants/media';
import Header from '../header';
import Footer from '../home/footer';

export default function ProductPage() {
  const { t } = useTranslation();

  const maxContentWidth = 1224;
  return (
    <>
      <Helmet>
        <title>Manekiswap | Product</title>
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
            <Flex sx={{ alignSelf: 'center', maxWidth: maxContentWidth, flexDirection: 'column' }}>
              <Heading>TURN DATA INTO DECISIONS</Heading>
              <Heading>Uncover investment and Marketing insights with Strategy AI Platform</Heading>
              <Text>
                Easily browse recommendation models that allow you to identify insights from the Financial, Ecommerce
                data and more - for better marketing and investment decisions.
              </Text>
            </Flex>

            <Flex sx={{ alignSelf: 'center', maxWidth: maxContentWidth, flexDirection: 'column' }}>
              <Heading>Why Maneki Strategy?</Heading>
              <Heading>
                To accelerate innovation in Financial and Ecommerce sector with no-code AI Strategy platform.
              </Heading>
              <Text>TBD</Text>
            </Flex>

            <Flex sx={{ alignSelf: 'center', maxWidth: maxContentWidth, flexDirection: 'column' }}>
              <Heading>Partner</Heading>
              <Heading>Our Partners</Heading>
              <Text>
                We have an extensive of partners so you can get the data, intergrations, and accuracy you need. From
                Data Source, to Data Warehouse and Cloud AI, we’ve made sure your businesss model is ready to go.
              </Text>
            </Flex>

            <Flex sx={{ alignSelf: 'center', maxWidth: maxContentWidth, flexDirection: 'column' }}>
              <Heading>AI MARKETPLACE</Heading>
              <Heading>Ready-made strategy for Financial & Marketing Services</Heading>
              <Text>
                Over 20 ready-made models are available for immediate deployment accross stock trading, crypto trading,
                marketing and more.
              </Text>
            </Flex>
          </div>

          <div
            sx={{
              marginTop: 10,
              background: `url("${BottomBg}") no-repeat center bottom/cover`,
              ...mediaWidthTemplates.upToMedium({
                backgroundImage: `url("${BottomTabletBg}")`,
              }),
              ...mediaWidthTemplates.upToSmall({
                backgroundImage: `url("${BottomMobileBg}")`,
              }),
            }}
          >
            <Footer
              sx={{
                marginTop: 168,
                ...mediaWidthTemplates.upToSmall({
                  marginTop: 100,
                }),
              }}
              maxContentWidth={maxContentWidth}
            />
          </div>
        </Flex>
      </Box>
    </>
  );
}
