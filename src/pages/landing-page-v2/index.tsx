import React from 'react';

import Explore from './explore';
import Footer from './footer';
import Header from './header';
import Intro from './intro';
import Partners from './partners';
import UseCases from './use-cases';
import Vision from './vision';

const LandingPageV2: React.FC = () => {
  const maxWidth = 1280;
  return (
    <div sx={{ maxWidth: 1440, marginX: 'auto', width: '100%' }}>
      <Header maxContentWidth={maxWidth} />
      <Vision maxContentWidth={maxWidth} />
      <Intro maxContentWidth={maxWidth} />
      <Partners maxContentWidth={maxWidth} />
      <Explore maxContentWidth={maxWidth} />
      <UseCases maxContentWidth={maxWidth} />
      <Footer maxContentWidth={maxWidth} />
    </div>
  );
};

export default LandingPageV2;
