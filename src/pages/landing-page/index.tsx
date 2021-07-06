import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useMedia, useWindowSize } from 'react-use';
import { Flex, useColorMode } from 'theme-ui';

import About from './about';
import Footer from './footer';
import Introduction from './introduction';
import Roadmap from './roadmap';
import { Subscribe } from './subscribe';
import TokenDistribution from './token-distribution';

export default function LandingPage() {
  const [, setColorMode] = useColorMode();
  const match = useRouteMatch('/landing');

  useEffect(() => {
    setColorMode('light');
  }, [match?.isExact, setColorMode]);

  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const { width } = useWindowSize();

  const paddingX = isLargerThan1024 ? `${Math.min(200, 200 - (1440 - width) / 4)}px` : '24px';

  return (
    <Flex
      sx={{
        alignSelf: 'center',
        maxWidth: 1440,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'background',
      }}
    >
      <About paddingX={paddingX} />
      <Introduction paddingX={paddingX} />
      <Roadmap paddingX={paddingX} />
      <TokenDistribution paddingX={paddingX} />
      <Subscribe paddingX={paddingX} />
      <Footer paddingX={paddingX} />
    </Flex>
  );
}
