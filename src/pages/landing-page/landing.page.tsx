import { Flex, useMediaQuery } from '@chakra-ui/react';
import { useWindowSize } from 'react-use';

import About from './about';
import Footer from './footer';
import Introduction from './introduction';
import Roadmap from './roadmap';
import { Subscribe } from './subscribe';
import TokenDistribution from './token-distribution';

export default function LandingPage() {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const { width } = useWindowSize();

  const paddingX = isLargerThan1024 ? `${Math.min(204, 204 - (1440 - width) / 4)}` : '24px';

  return (
    <Flex alignSelf="center" maxWidth="1440px" width="100%" flexDirection="column" backgroundColor="white">
      <About paddingX={paddingX} />
      <Introduction paddingX={paddingX} />
      <Roadmap paddingX={paddingX} />
      <TokenDistribution paddingX={paddingX} />
      <Subscribe paddingX={paddingX} />
      <Footer paddingX={paddingX} />
    </Flex>
  );
}
