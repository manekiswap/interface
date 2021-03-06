import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Flex } from 'theme-ui';

import BottomBg from '../../../assets/images/landing-v3/bottom.png';
import BottomMobileBg from '../../../assets/images/landing-v3/bottom-mobile.png';
import BottomTabletBg from '../../../assets/images/landing-v3/bottom-tablet.png';
import { mediaWidthTemplates } from '../../../constants/media';
import Footer from '../footer';
import Header from '../header';
import Banner from './banner';
import Explore from './explore';
import Intro from './intro';
import Partners from './partners';
import Subscribe from './subscribe';
import UseCases from './use-cases';
import Vision from './vision';

const maxContentWidth = 1224;

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Manekiswap | Home</title>
        <link rel="canonical" href="https://manekiswap.com/#/landing" />
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
          <Header maxContentWidth={maxContentWidth} />
          <Banner />
          <Vision maxContentWidth={maxContentWidth} />
          <Flex
            sx={{
              flexDirection: 'column',
              background:
                'linear-gradient(179.99deg, #151057 0.01%, rgba(116, 46, 146, 0.27) 64.48%, rgba(169, 55, 206, 0) 90.86%, rgba(191, 61, 223, 0) 111.41%)',
            }}
          >
            <Intro
              sx={{
                marginTop: 112,
                ...mediaWidthTemplates.upToSmall({
                  marginTop: 40,
                }),
              }}
              maxContentWidth={maxContentWidth}
            />
            <Partners
              sx={{
                marginTop: 216,
                ...mediaWidthTemplates.upToMedium({
                  marginTop: 96,
                }),
                ...mediaWidthTemplates.upToSmall({
                  marginTop: 74,
                }),
              }}
              maxContentWidth={maxContentWidth}
            />
          </Flex>
          <Explore
            sx={{
              marginTop: 216,
              ...mediaWidthTemplates.upToMedium({
                marginTop: 96,
              }),
              ...mediaWidthTemplates.upToSmall({
                marginTop: 74,
              }),
            }}
            maxContentWidth={maxContentWidth}
          />
          <Flex
            sx={{
              flexDirection: 'column',
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
            <UseCases
              sx={{
                marginTop: 198,
                ...mediaWidthTemplates.upToMedium({
                  marginTop: 82,
                }),
              }}
              maxContentWidth={maxContentWidth}
            />
            <Subscribe
              sx={{
                marginTop: 168,
                ...mediaWidthTemplates.upToSmall({
                  marginTop: 100,
                }),
              }}
            />
            <Footer
              maxContentWidth={maxContentWidth}
              sx={{
                marginTop: 300,
                ...mediaWidthTemplates.upToMedium({
                  marginTop: 200,
                }),
                ...mediaWidthTemplates.upToSmall({
                  marginTop: 100,
                }),
              }}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
