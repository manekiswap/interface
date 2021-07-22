import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Flex, useColorMode } from 'theme-ui';

import useIsWindowWider from '../../hooks/useIsWindowWider';
import { useWindowSize } from '../../hooks/useWindowSize';
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

  const isWiderThan1024 = useIsWindowWider(1024);
  const { width = 0 } = useWindowSize();

  const paddingX = isWiderThan1024 ? `${Math.min(200, 200 - (1440 - width) / 4)}px` : '24px';

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
