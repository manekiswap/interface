import { Flex } from '@theme-ui/components';
import React from 'react';

import BottomBg from '../../assets/images/landing-v3/bottom.png';
import BottomMobileBg from '../../assets/images/landing-v3/bottom-mobile.png';
import BottomTabletBg from '../../assets/images/landing-v3/bottom-tablet.png';
import { mediaWidthTemplates } from '../../constants/media';
import Explore from './explore';
import Footer from './footer';
import Header from './header';
import Intro from './intro';
import Partners from './partners';
import UseCases from './use-cases';
import Vision from './vision';

const LandingPage: React.FC = () => {
  const maxContentWidth = 1224;
  return (
    <div
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
        <Vision maxContentWidth={maxContentWidth} />
        <div
          sx={{
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
        </div>
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
          <UseCases
            sx={{
              marginTop: 198,
              ...mediaWidthTemplates.upToMedium({
                marginTop: 82,
              }),
            }}
            maxContentWidth={maxContentWidth}
          />
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
    </div>
  );
};

export default LandingPage;
