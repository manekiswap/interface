import { Flex } from '@theme-ui/components';
import React from 'react';

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
      </Flex>
    </div>
  );
};

export default LandingPage;
