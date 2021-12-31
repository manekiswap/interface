import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useMatch } from 'react-router-dom';
import { Flex, useColorMode } from 'theme-ui';

import { useMediaQueryMaxWidth } from '../../hooks/useMediaQuery';
import { useWindowSize } from '../../hooks/useWindowSize';
import About from './about';
import Footer from './footer';
import Header from './header';
import Introduction from './introduction';
import Roadmap from './roadmap';
import { Subscribe } from './subscribe';
import TokenDistribution from './token-distribution';

export default function LandingPage() {
  const [, setColorMode] = useColorMode();
  const match = useMatch('/landing');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColorMode('light');
  }, [!!match, setColorMode]);

  const { width = 0 } = useWindowSize();

  const isUpToMedium = useMediaQueryMaxWidth('upToMedium');
  const paddingX = isUpToMedium ? 24 : Math.min(200, 200 - (1440 - width) / 4);

  return (
    <>
      <Helmet>
        <title>Manekiswap | Home</title>
        <link rel="canonical" href="https://manekiswap.com/#/landing" />
      </Helmet>

      <Flex
        ref={ref}
        sx={{
          alignSelf: 'center',
          maxWidth: 1440,
          width: '100%',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }}
      >
        <Header paddingX={paddingX} width={ref.current?.offsetWidth} />
        <About paddingX={paddingX} />
        <Introduction paddingX={paddingX} />
        <Roadmap paddingX={paddingX} />
        <TokenDistribution paddingX={paddingX} />
        <Subscribe paddingX={paddingX} />
        <Footer paddingX={paddingX} />
      </Flex>
    </>
  );
}
