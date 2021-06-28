import { useMedia, useWindowSize } from 'react-use';
import { Flex } from 'theme-ui';

import { useInvertedColorMode } from '../../utils';
import About from './about';
import Footer from './footer';
import Introduction from './introduction';
import Roadmap from './roadmap';
import { Subscribe } from './subscribe';
import TokenDistribution from './token-distribution';

export default function LandingPage() {
  const isLargerThan1024 = useMedia('(min-width: 1024px)');
  const { width } = useWindowSize();
  const backgroundColor = useInvertedColorMode('background');

  const paddingX = isLargerThan1024 ? `${Math.min(200, 200 - (1440 - width) / 4)}px` : '24px';

  return (
    <Flex
      sx={{
        alignSelf: 'center',
        maxWidth: 1440,
        width: '100%',
        flexDirection: 'column',
        backgroundColor,
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
